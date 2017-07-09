export function getAParent(target) {
  if (target === null || target.tagName === "A") {
    return target;
  }
  return getAParent(target.parentElement);
}
