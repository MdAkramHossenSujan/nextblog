import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function AddBlog() {
  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle>Add Your Blog</CardTitle>
            <CardDescription>
              Creat A new Blog Post And Share.
            </CardDescription>
          </CardHeader>
        </Card>
    </div>
  )
}
