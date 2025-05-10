import { redirect } from 'next/navigation';
import { defaultLanguage } from './layout';

export default function Home() {
  redirect(`/${defaultLanguage}`);
}
