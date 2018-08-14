export const register = () => {
  return '/api/register'
}

export const login = () => {
  return '/api/login'
}

export const forgotPassword = () => {
  return '/api/password/email'
}

export const resetPassword = () => {
  return '/api/password/reset'
}

export const logout = () => {
  return '/api/logout'
}

export const userDetails = () => {
  return '/api/user'
}

export const myHive = () => {
  return '/api/user/followed-users'
}

export const createPost = () => {
  return '/api/posts'
}

export const hivePosts = () => {
  return '/api/hive_posts'
}

export const reactPost = () => {
  return '/api/post-reactions/store-or-update'
}

export const singlePost = (id) => {
  return `/api/posts/${id}`
}

export const selfPosts = () => {
  return '/api/posts'
}

export const bugPosts = () => {
  return '/api/bug_posts'
}

export const updateUser = () => {
  return '/api/user/update'
}

export const changePassword = () => {
  return '/api/user/change-password'
}

export const singleUserPosts = (id) => {
  return `/api/posts/user/${id}`
}

export const bugs = () => {
  return '/api/user/followers'
}

export const promote = (id) => {
  return `/api/user/${id}/promote`
}

export const demote = (id) => {
  return `/api/user/${id}/demote`
}

export const pest = (id) => {
  return `/api/user/${id}/pest`
}

export const search = (searchTerm) => {
  return `/api/user/search/key=${searchTerm}`
}

export const logs = () => {
  return '/api/bug_lives'
}

export const pollen = () => {
  return '/api/pollen'
}

export const buzzPost = (id) => {
  return `/api/post-buzz/${id}`
}

export const updatePost = (id) => {
  return `/api/posts/${id}/update`
}

export const deletePost = (id) => {
  return `/api/posts/${id}/delete`
}
