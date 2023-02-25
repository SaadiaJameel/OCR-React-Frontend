import { useState } from "react";
import Entries from "./Entries";
import EntryDetails from "./EntryDetails";

const EntryPage = () => {
    
    const [details, setDetails] = useState(null);
    const [showList, setShowList] = useState(true);

    return (
        <div className="entry_page">
        {
            showList &&
            <div className="entries_left">
                <Entries setDetails={setDetails}/> 
            </div>
        }
        
        {
            !!details && 
            <div className="entries_right">
               <EntryDetails details={details} setDetails={setDetails} setShowList={setShowList}/>
            </div>

        }
        </div>
    );
};

export default EntryPage;