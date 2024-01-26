"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AvatarChangeSchema } from "@/schema";

import { getSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const Avatar = () => {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();
  const [avatar, setAvatar] = useState("");

  const form = useForm<z.infer<typeof AvatarChangeSchema>>({
    resolver: zodResolver(AvatarChangeSchema),
    defaultValues: {
      avatarImg: undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof AvatarChangeSchema>) => {
      const id = (await supabase.auth.getUser()).data.user?.id;
      const avatarPath = `${id}/profile`;

      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(avatarPath, values.avatarImg, {
          upsert: true,
        });

      if (storageError) throw new Error(storageError.message);
    },
    onSuccess: async () => {
      toast.success("Profile changed successfully");
      queryClient.resetQueries({ queryKey: ["avatar"] });
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  async function onSubmit(values: z.infer<typeof AvatarChangeSchema>) {
    mutate(values);
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

// https://rwvkefiplowngqovvfyi.supabase.co/storage/v1/object/public/avatars/eebc22ad-d07b-47e3-a603-3d56ccbbb8a1/profile
