import mongoose from "mongoose"; // brings in the whole mongoose library to be able to use schema and model
import { Friendship } from "../types/friendshipTypes.js"; // brings in friendship interface. tells mongoose "the documents in htis collection have the shape of a Friendship". Give TS autocomplete and type-checking

const FriendshipSchema = new mongoose.Schema( //Blueprint for what a document in this collection should look like. Fields, types, required, etc. MongoDB doesnt enforce structure, so mongoose adds it
  //constructor takes two arguments: fields object: what each document should look like (requester etc)
  // options: settings for the schema (collection, timestamps)
  {
    requester: {
      // name of field
      type: mongoose.Schema.Types.ObjectId, //stores a MongoDB objectID (24-character ID). Not storing the whole user, just a pointer to one. When user "abc123" sends a request, the requester field will hold the value abc123.
      ref: "User", // refers to a document in User collection.
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"], //enum = only allowed values are these.
      default: "pending",
    },
  },
  {
    collection: "friendships", // what to name the collection in mongoDb
    timestamps: true, // add createdAt and updatedAt, mongoose sets and updates on its own.
  },
);

//method call
// call the index method on this schema, create special lookup structure called index
FriendshipSchema.index({ requester: 1, recipient: 1 }, { unique: true });

const FriendshipModel = mongoose.model<Friendship>(
  "Friendship",
  FriendshipSchema,
);

export default FriendshipModel;
