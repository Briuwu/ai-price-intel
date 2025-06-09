import { GeneratedURL } from "./components/generated-url";
import { UserInput } from "./components/user-input";

export default function IntelPage() {
  return (
    <main className="grid grid-cols-12 p-5">
      <div className="col-span-full space-y-5 lg:col-span-4">
        <UserInput />
        <GeneratedURL />
      </div>
    </main>
  );
}
