import {IUser} from "@/types/user.types";

export function sortContactsName (contacts: IUser[], ascending: boolean = true) : IUser[] {
    const copy: IUser[] = JSON.parse(JSON.stringify(contacts))
    const sorted = copy.sort((a, b) => {
        if (ascending) {
            return a.full_name.localeCompare(b.full_name)
        } else {
            return b.full_name.localeCompare(a.full_name)
        }

    })
    return sorted
}