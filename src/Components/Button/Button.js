import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const StyledButton = withStyles({
    root: {
      border:"2px solid #F7A072",
      borderRadius: "5px ",
      width:"105px",
      height:"36px",
     
      color: 'Black',
      
      fontFamily:"inherit",
      padding:"0"
      
      
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  export default StyledButton;