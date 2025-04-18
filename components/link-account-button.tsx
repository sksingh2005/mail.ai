'use client'
import React from 'react'
import { Button } from './ui/button';
import { getAurinkoAuthURL } from '@/lib/aurinko';

function LinkAccountButton() {
  return (
    <Button onClick={async ()=>{
        const authurl = await getAurinkoAuthURL('Google');
        window.location.href= authurl;
    }}>
        Link Account
    </Button>
  )
}

export default LinkAccountButton;
