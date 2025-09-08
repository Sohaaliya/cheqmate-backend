// small helper to request local camera
export async function getLocalStream(constraints = { video: true, audio: false }) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}
