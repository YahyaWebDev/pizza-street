'use client';
import Image from "next/image"
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
        <SignedOut>
            <SignInButton>
                <button className="bg-black outline-2 text-white p-2 rounded-xl shadow-[0px_0px_20px_3px_#000000] cursor-pointer hover:bg-green-500 hover:text-black transition-all duration-1000 active:bg-emerald-600">S'inscrire</button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
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