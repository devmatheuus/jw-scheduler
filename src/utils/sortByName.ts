import { CreateChristian } from "../types/christian/createChristian";

export const sortByName = (christians: CreateChristian[] ) => {
    const sortedChristians = christians.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
    
        return 0;
    });
    
    return sortedChristians;
}