import { useState } from 'react';
const { Button, getListItemSecondaryActionClassesUtilityClass } = require("@mui/material");
import CheckIcon from '@mui/icons-material/Check';

function TagCard(props) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div style={{ position: "relative", margin: "0.25em", display: 'flex', alignItems: 'center' }}>
            <Button
                variant="contained"
                style={{ width: "30vw", height: "100%", backgroundColor: "#D9D9D9", color: "black", justifyContent: "flex-start", textTransform:'none' }}
                onClick={handleClick}
            >
                {props.tag}
            </Button>
            {isClicked && <CheckIcon style={{ position: "absolute", right: "10px" }} />}

        </div>
    )
}

export default TagCard;