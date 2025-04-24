export interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: number | null
  name: string
  description: string
  logo_url: string | null
}

export interface Category {
  id: number
  name: string
  restaurant_id: number
  created_at: string
}

export interface Dish {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
  category_id: number
  restaurant_id: number
  created_at: string
}

export interface AuthCredentials {
  email: string
  password: string
}
