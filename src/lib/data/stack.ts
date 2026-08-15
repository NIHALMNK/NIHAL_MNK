import { StackItem } from "@/types/stack";
import { stackData } from "@/data/stack";

export async function getStackItems(): Promise<StackItem[]> {
  return stackData;
}
