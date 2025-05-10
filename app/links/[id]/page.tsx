import links from "@/links.json";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export default async function Link(props: {
  params: { id: string };
  searchParams: { bot?: string };
}) {
  const { bot } = props.searchParams;
  const { id } = props.params;
  const link = links[id];

  if (link == null) {
    return notFound();
  }

  if (
    bot ||
    /bot/i.test((await headers()).get("user-agent") as string)
  ) {
    return <></>;
  } else {
    redirect(link.link);
  }
}
