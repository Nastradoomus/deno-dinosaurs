const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
const to = "aaaaeeeeiiiioooouuuunc------";

export function slugify(s: string) {
  s = s.replace(/^\s+|\s+$/g, "").toLowerCase();
  for (let i: number = 0, l = from.length; i < l; i++) {
    s = s.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  s = s.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  return s;
}
