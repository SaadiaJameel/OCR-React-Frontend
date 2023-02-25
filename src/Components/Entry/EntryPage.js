import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Entries from "./Entries";
import EntryDetails from "./EntryDetails";

const EntryPage = () => {
    
    const [details, setDetails] = useState(null);
    const [showList, setShowList] = useState(true);

    return (
        <>
            <div className="inner_content">
            {
                showList &&
                <div>
                    <Typography sx={{ fontWeight: 700}} variant="h5">Entry</Typography> 
                    <Entries setDetails={setDetails}/>
                </div>
            }
            {
            !!details && 
            <div>
               <EntryDetails details={details} setDetails={setDetails} setShowList={setShowList}/>
            </div>

            }
            </div>
            
        </>
    );
};

export default EntryPage;