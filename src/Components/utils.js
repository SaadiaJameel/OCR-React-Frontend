import {LinearProgress} from '@mui/material';

export function stringToColor(string) {
    let i, hash = 0;
    let color = '#';

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
}

export function stringAvatar(name, size=40) {
    return {
    sx: {bgcolor: stringToColor(name), width: size, height: size},
    children: `${name.split(' ')[0][0]}${name.split(' ')[1]?name.split(' ')[1][0]:""}`,
    };
}

export function passwordStrength(password){

    const lowerAndUpper = password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/);
    const specialCharacter = password.match(/([!,%,&,@,#,$,^,*,?,_,~])/);
    const number = password.match(/([0-9])/);
    const length = password.length > 7;

    if(lowerAndUpper && specialCharacter && number && length){
        return 100;
    }else if(length && (lowerAndUpper || number || specialCharacter)){
        return 50;
    }else if(!length){
        return password.length * 3;
    }else{
        return 30;
    }
}

export const PasswordStrengthIndicator=({password})=>{

    const progress = passwordStrength(password);

    return(
        <>
        <LinearProgress variant="determinate" value={progress} color={progress<30?'error':progress<60?'warning':'success'}/>
        <p>The password should satisfy the below constraints.</p>
        <ul>
            <li>Atleast 8 Character</li>
            <li>Lowercase & Uppercase</li>
            <li>Number (0-9)</li>
            <li>Special Character (!@#$%^&*)</li>
        </ul>
        </>
    )
}