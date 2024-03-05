export interface SimplePost {
  id: number
  title: string
  is_public: boolean
  profiles: {
    email: string
    nickname: string
  }
}
