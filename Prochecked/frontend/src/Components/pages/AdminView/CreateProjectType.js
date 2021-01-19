import React from "react";
import {
  TextField,
  withStyles,
  Button,
  List,
  ListItem,
  Link,
  Typography,
  Input,
  Grid,
} from "@material-ui/core";
import { AppApi } from "../../../AppApi";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';

class CreateProjectType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null, //für CreateProjectType
      ects:'',
      sws:'',
      type:'',
      allTypes: [], // für Rollenliste
      typeValidationFailed: false, //prüft eingabe des projectType im Textfeld
      success: false, //r:nach eingabe der Rolle wird state auf true gesetzt --> status erfolgreich wird angezeigt
    };
  }



  /** Create person */
     createProjecType(name, ects, sws){
      var api = AppApi.getAPI()
      // console.log(api)
      api.createProjecType(name, ects, sws).then((type) =>
          {
            // console.log(person)
          this.setState({
              type: type
          },
          )}
          )
          console.log(this.state.type)
        }


  /** Delete Type */
  deleteType = (t) => {
    console.log(t.getID());
    var api = AppApi.getAPI();
    api
      .deleteProjectType(t.getID())
      .then(() => {
        this.setState({
          // Set new state when ParticipationBOs have been fetched
          deletingInProgress: false, // loading indicator
          deletingError: null,
        });
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
          deletingInProgress: false,
          deletingError: e,
        })
      );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null,
    });
  };

  ProjectTypeList(){
    var api = AppApi.getAPI()
    api.getProjectType().then((allTypes) =>
      {
          this.setState({
            allTypes: allTypes
            })}
            )
          }

  textFieldValueChange = (event) => {
    const value = event.target.value;

    this.setState({
      [event.target.id]: value,
    });

    if (value.length > 1) {
      //eingabe des textfields muss mindestens 1 zeichen enthalten

      this.setState({
        typeValidationFailed: false,
      });

      this.state.allTypes.map((t) => {
        if (t.name === value) {
          //t:prüft ob projectType bereits eingegeben wurde, wenn ja kann dieses nicht eingegeben werden
          this.setState({
            typeValidationFailed: true,
          });
        }
      });
    } else {
      this.setState({
        typeValidationFailed: true,
      });
    }
  };

/** Delete Persons */
deleteProjectType = (t) => { console.log(t.getID()) 
  var api = AppApi.getAPI()
  api.deleteProjectType(t.getID()).then(() => {
    this.setState({  // Set new state when ParticipationBOs have been fetched
      deletingInProgress: false, // loading indicator 
      deletingError: null,
    })
  }).catch(e =>
    this.setState({ // Reset state with error from catch 
      deletingInProgress: false,
      deletingError: e
    })
  );
  // set loading to true
  this.setState({
    deletingInProgress: true,
    deletingError: null
  });
}

  handleSubmit = (event) => {
    event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    if (this.state.typeValidationFailed === false) {
      //t: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
      this.CreateProjectType(
        this.state.type,)
        this.state.ects,
        this.state.sws,

      this.setState({
        success: true,
      });
    }
  };

  componentDidMount() {
    //  this.TypeList();
  }

  render() {
    const { classes } = this.props;
    const { name, type, sws, ects, allTypes, typeValidationFailed, success } = this.state;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Neue Projektart eingetragen: </h1>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="text"
                  required
                  fullWidth
                  margin="normal"
                  id="projektart"
                  label="Projektart"
                  value={name}
                  onChange={this.textFieldValueChange}
                  error={typeValidationFailed}
                  onInput={(e) => this.setState({ type: e.target.value })}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie einen Projektart ein"
                      : success === true
                      ? "Projektart erfolgreich eingetragen!"
                      : ""
                  }
                />
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="number"
                  required
                  fullWidth
                  margin="normal"
                  id="ECTS"
                  label="ECTS"
                  value={ects}
                  onChange={this.textFieldValueChange}
                  error={typeValidationFailed}
                  onInput={(e) => this.setState({ type: e.target.value })}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie die Anzahl an ECTS ein:"
                      : success === true
                      ? "ECTS erfolgreich eingetragen!"
                      : ""
                  }
                />
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="number"
                  required
                  fullWidth
                  margin="normal"
                  id="SWS"
                  label="SWS"
                  value={sws}
                  onChange={this.textFieldValueChange}
                  error={typeValidationFailed}
                  onInput={(e) => this.setState({ type: e.target.value })}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie die Anzahl an SWS ein:"
                      : success === true
                      ? "SWS erfolgreich eingetragen!"
                      : ""
                  }
                />
                <Button
                  type="submit"
                  className={classes.buttonMargin}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Eintragen
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <h1>Bestehende Projektarten</h1>
            <Paper className={classes.paper}>
              <div>
                {allTypes.map((t) => (
                  <ListItem>
                    {t.name}

                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteProjectType(t)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  buttonMargin: {
    marginLeft: theme.spacing(11),
    size: "small",
  },
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(CreateProjectType);
