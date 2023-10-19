import { Fragment } from "react"
import {
    useSupabaseClient,
  } from "@supabase/auth-helpers-react";
// @ts-ignore
import { Database } from "../utils/database.types";
// @ts-ignore
import { supabase } from './../lib/supabaseClient';
import { createClient } from '@supabase/supabase-js'
export default function Data(dataTemp:any){
    const supabaseClient = createClient('https://frqeptoeeoyjaipcynip.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycWVwdG9lZW95amFpcGN5bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTk0NzAsImV4cCI6MTk5MjIzNTQ3MH0.1cDqSRfYw2qACKURNrZyyP4OU0u2ag_YZLOYzgtPhQ0')

    async function getServerSideProps() {
        let {data,error} = await supabaseClient 
        .from('wx_meas')
        .select('created_at')
        .order('id',{ascending:false})
        .limit(1)
        return (
            console.log(data)
    )}












    {/* 
    const supabase = useSupabaseClient<Database>();
    { /*const getData =async () => { *
    async function getData() {   
    let {data,error} = await supabaseClient 
        .from('wx_meas')
        .select('created_at')
        .order('id',{ascending:false})
        .limit(1)
        return (
        console.log(data)
        )}
    */}
    return(
        <h2>{dataTemp}</h2>
    )
    }