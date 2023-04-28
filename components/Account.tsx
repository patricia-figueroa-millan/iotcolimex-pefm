import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
// @ts-ignore
import { Database } from "../utils/database.types";
// COMPONENTE "Account" anida a componente "Avatar"
import Avatar from "./Avatar";
import { SimpleGrid } from "@mantine/core";

import ApplicationShell from "./ApplicationShell";
import Layout from "./Layout";

import { Button } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { NativeSelect } from "@mantine/core";
export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ width: "10%" }}>
        <NativeSelect
          data={["1", "2", "3", "4"]}
          label="Nodo"
          description="Seleccionar estación"
          size="md"
        />
      </div>
      <label
        style={{ display: "block", margin: "30px 0 0 0", fontFamily: "Arial" }}
      >
        Último valor sensado
      </label>
      <div style={{ padding: "30px 0 0 0" }}>
        <SimpleGrid cols={5} spacing="sm">
          <div
            style={{
              width: "200px",
              height: "200px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          ></div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          ></div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          ></div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          ></div>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          ></div>
        </SimpleGrid>
      </div>
      <span style={{ padding: "50px" }}> </span>
      <div
        style={{
          width: "1200px",
          height: "200px",
          borderStyle: "solid",
          borderColor: "black",
        }}
      ></div>
    </div>
  );
}
