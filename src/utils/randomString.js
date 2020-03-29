export default function randomString() {
  return Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5);
}
