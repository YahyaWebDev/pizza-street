'use client';
import Image from "next/image"
import Link from "next/link";
import {
  ClerkProvider, SignInButton, SignUpButton, SignedIn,SignedOut, UserButton,
} from '@clerk/nextjs';

export default function NavBar(){
    return (
    <main className="flex flex-col justify-center items-center flex-nowrap gap-3 m-5">
    <div className={`flex justify-center items-center flex-nowrap gap-5 `}>
        <Image 
            src="/pizza street logo.png"
            width={100}
            height={100}
            alt="logo"
        />
        <ClerkProvider>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkProvider>
    </div> 
          <nav className="flex justify-center items-center flex-nowrap gap-3">
        <Link href="/pizzaCategory" className=" outline-2 p-1 rounded cursor-pointer hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white transition-all duration-1000">Pizzas</Link>
        <Link href="/sandwichCategory" className=" outline-2 p-1 rounded cursor-pointer hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white transition-all duration-1000">Sandwich</Link>
        <Link href="/juicesCategory"  className=" outline-2 p-1 rounded cursor-pointer hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white transition-all duration-1000">Jus</Link>
        <Link href="/drinksCategory"  className=" outline-2 p-1 rounded cursor-pointer hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white transition-all duration-1000">Les Boissons</Link>
      </nav>
    </main>
    );
}
