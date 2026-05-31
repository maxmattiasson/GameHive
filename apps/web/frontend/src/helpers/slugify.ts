export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD") // separates accents from letters, ö > o + ¨
    .replace(/[\u0300-\u036f]/g, "") // removes the separated accent marks
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, ""); // remove dashes from start and end
}
