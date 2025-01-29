import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createAction } from "../../lib/actions/department";

export default async function Page() {
    return (
        <div className="flex flex-col items-center px-4">
            <h1 className="text-3xl font-bold mb-6">
                Create a new department
            </h1>
            <form className="grid gap-4 max-w-xs w-full p-6 bg-white shadow-lg rounded-lg" action={createAction}>
                <Label>Department name</Label>
                <Input type="text" id="name" name="name" placeholder="department name" />
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </div>
    );
}