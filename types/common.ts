export interface Post {
  created_at: string
  id: number
  post_json: any
  title: string
  updated_at: string
  user_id: string
  is_public: boolean
  profiles: {
    email: string
    nickname: string
  }
}

export interface CheckData {
  data: {
    user_id: string
    is_public: boolean
  }
}
