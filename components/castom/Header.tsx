'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Leaf } from 'lucide-react'

export default function Header() {
    
  return (
    <header className="bg-white shadow-md  px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <Link href={"/"} className='flex items-center gap-1'>
        <Leaf className="text-green-600" size={28} />
        <h1 className="text-2xl font-bold text-gray-800">FruitStore</h1>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="#">
          <span className="text-gray-700 hover:text-green-600 transition-colors font-medium">Home</span>
        </Link>
        <Link href="#">
          <span className="text-gray-700 hover:text-green-600 transition-colors font-medium">Contact</span>
        </Link>
      </nav>
      <Button variant="outline" size="icon" className='cursor-pointer'>
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </header>
  )
}
