import api from "../api";

async function userLoader({ params }: { params: any }) {
  return api.getUserByUsername(params.username)
}

export {
  userLoader
}