export interface SimplePost {
  id: number
  title: string
  description: string
  is_public: boolean
  profiles: {
    email: string
    nickname: string
  }
}

export interface Pin {
  id: string
  label: string
}
