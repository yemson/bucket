export interface Post {
  created_at: string
  id: number
  post_json: any
  title: string
  updated_at: string
  user_id: string
  profiles: {
    email: string
    nickname: string
  }
}
