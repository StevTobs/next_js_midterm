/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useRouter } from 'next/navigation';



function reload () {
    const router = useRouter()
  return (
    router.push('../')
  );
}

export default reload;

