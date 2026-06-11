import "dotenv/config";
import mongoose from "mongoose";
import UserModel from "../src/models/User.js";
import GameModel from "../src/models/Game.js";
import GenreModel from "../src/models/Genre.js";
import AchievementsModel from "../src/models/Achievements.js";
import LibraryModel from "../src/models/Library.js";
import ReviewModel from "../src/models/Review.js";
import FriendshipModel from "../src/models/Friendship.js";
import { connectDB } from "../src/config/db.js";

const APPLY = process.argv.includes("--apply");

type IdLike = mongoose.Types.ObjectId | string | null | undefined;

function toIdString(id: IdLike): string | null {
  if (!id) return null;
  return String(id);
}

async function getIdSet(model: mongoose.Model<any>): Promise<Set<string>> {
  const docs = await model.find({}, { _id: 1 }).lean();
  return new Set(docs.map((d) => String(d._id)));
}

async function deleteDocsWithInvalidRef(
  model: mongoose.Model<any>,
  field: string,
  validIds: Set<string>,
  label: string
) {
  const docs = await model
    .find({ [field]: { $exists: true, $ne: null } }, { _id: 1, [field]: 1 })
    .lean();
  const invalidDocIds = docs
    .filter((d) => {
      const ref = toIdString(d[field]);
      return !ref || !validIds.has(ref);
    })
    .map((d) => d._id);

  if (invalidDocIds.length === 0) {
    console.log(label + ": 0 att ta bort");
    return 0;
  }

  if (APPLY) {
    await model.deleteMany({ _id: { $in: invalidDocIds } });
  }

  console.log(
    label +
      ": " +
      invalidDocIds.length +
      (APPLY ? " borttagna" : " skulle tas bort")
  );
  return invalidDocIds.length;
}

async function unsetInvalidOptionalRef(
  model: mongoose.Model<any>,
  field: string,
  validIds: Set<string>,
  label: string
) {
  const docs = await model
    .find({ [field]: { $exists: true, $ne: null } }, { _id: 1, [field]: 1 })
    .lean();
  const invalidDocIds = docs
    .filter((d) => {
      const ref = toIdString(d[field]);
      return !!ref && !validIds.has(ref);
    })
    .map((d) => d._id);
  if (invalidDocIds.length === 0) {
    console.log(label + ": 0 att uppdatera");
    return 0;
  }
  if (APPLY) {
    await model.updateMany(
      {
        _id: { $in: invalidDocIds }
      },
      { $unset: { [field]: "" } }
    );
  }
  console.log(
    label +
      ": " +
      invalidDocIds.length +
      (APPLY ? " uppdaterade" : " skulle uppdateras")
  );
  return invalidDocIds.length;
}

async function filterInvalidVotesUsers(validUsersIds: Set<string>) {
  const docs = await ReviewModel.find(
    { votes: { $exists: true, $ne: [] } },
    { _id: 1, votes: 1 }
  ).lean();
  const ops: any[] = [];

  for (const d of docs) {
    const votes = Array.isArray(d.votes) ? d.votes : [];
    const filtered = votes.filter((v: any) => {
      const userId = toIdString(v?.user);
      return !!userId && validUsersIds.has(userId);
    });
    if (filtered.length !== votes.length) {
      ops.push({
        updateOne: {
          filter: {
            _id: d._id
          },
          update: {
            $set: { votes: filtered }
          }
        }
      });
    }
  }
  if (ops.length === 0) {
    console.log("Review.votes.user: 0 att uppdatera");
    return 0;
  }
  if (APPLY) {
    await ReviewModel.bulkWrite(ops);
  }
  console.log(
    "Review.votes.user:" +
      ops.length +
      (APPLY ? " uppdaterade" : " skulle uppdateras")
  );
  return ops.length;
}

async function filterInvalidIdsInArrayField(
  model: mongoose.Model<any>,
  field: string,
  validIds: Set<string>,
  label: string
) {
  const docs = await model.find({ [field]: { $exists: true, $ne: [] } }).lean();
  const ops: any[] = [];

  for (const d of docs) {
    const arr = Array.isArray(d[field]) ? d[field] : [];
    const filtered = arr.filter((id: IdLike) => {
      const s = toIdString(id);
      return !!s && validIds.has(s);
    });

    if (filtered.length !== arr.length) {
      ops.push({
        updateOne: {
          filter: { _id: d._id },
          update: { $set: { [field]: filtered } }
        }
      });
    }
  }

  if (ops.length === 0) {
    console.log(label + ": 0 att uppdatera");
    return 0;
  }

  if (APPLY) {
    await model.bulkWrite(ops);
  }

  console.log(
    label + ": " + ops.length + (APPLY ? " uppdaterade" : " skulle uppdateras")
  );
  return ops.length;
}

async function main() {
  await connectDB();

  const userIds = await getIdSet(UserModel);
  const gameIds = await getIdSet(GameModel);
  const genreIds = await getIdSet(GenreModel);
  const achievementIds = await getIdSet(AchievementsModel);

  console.log(APPLY ? "MODE: APPLY" : "MODE: DRY-RUN");

  let totalChanges = 0;

  const deleteRules = [
    [LibraryModel, "userId", userIds, "Library.userId"],
    [LibraryModel, "gameId", gameIds, "Library.gameId"],
    [ReviewModel, "user", userIds, "Review.user"],
    [ReviewModel, "game", gameIds, "Review.game"],
    [FriendshipModel, "requester", userIds, "Friendship.requester"],
    [FriendshipModel, "recipient", userIds, "Friendship.recipient"]
  ] as const;

  for (const [model, field, validIds, label] of deleteRules) {
    totalChanges += await deleteDocsWithInvalidRef(
      model,
      field,
      validIds,
      label
    );
  }

  const unsetRules = [
    [GameModel, "ownerUserId", userIds, "Game.ownerUserId"]
  ] as const;

  for (const [model, field, validIds, label] of unsetRules) {
    totalChanges += await unsetInvalidOptionalRef(
      model,
      field,
      validIds,
      label
    );
  }

  totalChanges += await filterInvalidVotesUsers(userIds);
  totalChanges += await filterInvalidIdsInArrayField(
    GameModel,
    "genres",
    genreIds,
    "Game.genres[]"
  );
  totalChanges += await filterInvalidIdsInArrayField(
    UserModel,
    "userAchievements",
    achievementIds,
    "User.userAchievements[]"
  );

  console.log("Klart. Totala ändringar:", totalChanges);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Cleanup failed:", err);
  await mongoose.disconnect();
  process.exit(1);
});
