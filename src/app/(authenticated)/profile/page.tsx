"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getProfile } from "@/lib/actions/server";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getSupabaseClient } from "@/lib/supabase/client";

const formSchema = z.object({
  avatarImg: z.any(),
});

const Profile = () => {
  const [avatar, setAvatar] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarImg: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = getSupabaseClient();
    const id = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${id}/profile`, values.avatarImg, { upsert: true });
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
          <CardDescription>View or update your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatarImg"
                render={({ field }) => (
                  <FormItem className="relative flex w-[200px] mx-auto aspect-square items-center justify-center rounded-full border border-dashed text-sm">
                    <FormLabel
                      htmlFor="picture"
                      className="cursor-pointer w-full h-full flex justify-center items-center"
                    >
                      {avatar ? (
                        <Image
                          src={avatar}
                          fill={true}
                          objectFit="contain"
                          alt="profile image"
                          className="rounded-full"
                        />
                      ) : (
                        <ImageIcon />
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            setAvatar(imageUrl);
                            field.onChange(file);
                          } else {
                            setAvatar("");
                            field.onChange(file);
                          }
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Profile;
