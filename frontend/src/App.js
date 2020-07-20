import React, {useState, useEffect} from 'react';
import 'fontsource-roboto';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/FolderOpen';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import logoImg from "./logo.png";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;

function CreatePageDialog(props) {
  const [formUrl, setFormUrl] = useState("")
  // const [formTitle, setFormTitle] = useState("")
  const [formDesc, setFormDesc] = useState("")
  // const [formPid, setFormPid] = useState(1)

  let handleUrlChange = (event) => {
    setFormUrl(event.target.value)
  }

  // let handleTitleChange = (event) => {
  //   setFormTitle(event.target.value)
  // }

  let handleDescChange = (event) => {
    setFormDesc(event.target.value)
  }

  let handlePidChange = (event) => {
    // setFormPid(event.target.value)
    props.pidFunc(event.target.value)
  }

  let handleSubmit = () => {
    let req = "http://localhost:3000/create/page"
    fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: formUrl,
        // title: formTitle,
        desc: formDesc,
        pid: props.pid,
      })
    })
    .then(res => {
      if (!res.ok) {
        props.errFunc("Network error: " + res.text())
        props.closeFunc()
        return
      }
      return res.text()
    })
    .then((result) => {
      console.log("create page: ", req, result)
    })
    .catch((error) => {
      console.log("Error: ", error)
      props.errFunc("Error: " + error)
    })
    props.closeFunc()
  }

  return(
    <Dialog open={props.open} onClose={props.closeFunc}>
      <DialogTitle id="form-create-page">Create New Page</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new bookmark page, please enter the following information.
        </DialogContentText>
        <TextField
          id="form-create-page-url"
          label="URL"
          type="text"
          value={formUrl}
          onChange={handleUrlChange}
        />
        <br />
        {/*<TextField
          id="form-create-page-title"
          label="Title"
          type="text"
          value={formTitle}
          onChange={handleTitleChange}
        />
        <br />*/}
        <TextField
          id="form-create-page-desc"
          label="Description"
          type="text"
          value={formDesc}
          onChange={handleDescChange}
        />
        <br />
        <TextField
          id="form-create-page-parentid"
          label="Parent ID"
          type="number"
          value={props.pid}
          onChange={handlePidChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeFunc}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateCategoryDialog(props) {
  const [formName, setFormName] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formPid, setFormPid] = useState(1)

  let handleNameChange = (event) => {
    setFormName(event.target.value)
  }

  let handleDescChange = (event) => {
    setFormDesc(event.target.value)
  }

  let handlePidChange = (event) => {
    setFormPid(event.target.value)
  }

  let handleSubmit = () => {
    let req = "http://localhost:3000/create/category"
    fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formName,
        desc: formDesc,
        pid: formPid,
      })
    })
    .then(res => res.text())
    .then((result) => {
      console.log("create category: ", req, typeof(result), result)
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
  }

  return(
    <Dialog open={props.open} onClose={props.closeFunc}>
      <DialogTitle id="form-create-category">Create New Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new category, please enter the following information.
        </DialogContentText>
        <TextField
          id="form-create-category-name"
          label="Name"
          type="text"
          value={formName}
          onChange={handleNameChange}
        />
        <br />
        <TextField
          id="form-create-category-desc"
          label="Description"
          type="text"
          value={formDesc}
          onChange={handleDescChange}
        />
        <br />
        <TextField
          id="form-create-category-parentid"
          label="Parent ID"
          type="number"
          value={formPid}
          onChange={handlePidChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeFunc}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ShowPage(props) {
  const classes = useStyles();
  const [cdx, setCdx] = useState("")

  function deletePage() {
    fetch("http://localhost:3000/delete/page/"+props.page.id)
    .then(res => res.json())
    .then((result) => {
      console.log("fetch: ", typeof(result), result)
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }

  useEffect(() => {
    let req = "http://localhost:3000/cdx"
    fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: props.page.url})
    })
    .then(res => res.text())
    .then((result) => {
      console.log("cdx: ", req, typeof(result), result)
      if (result) {
        setCdx(result)
      }
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
  }, [])

  return(
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <BookmarkIcon style={{marginRight: 10}} />
        Page: {props.page.id} - {props.page.title}
        <DeleteIcon
          style={{position: "absolute", right: 50}}
          onClick={deletePage}
        />
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a href={props.page.url}><Button>Visit original</Button></a>
        {cdx ?
          <a href={"http://localhost:8080/bookmarks-archive/"+props.page.url}><Button>View Archive</Button></a> : null
        }
        <a href={"http://localhost:8080/bookmarks-archive/record/"+props.page.url}><Button>Create Archive</Button></a>
        <br />
        <TextField
          multiline
          value={cdx}
          label="CDX"
          disabled
          variant="outlined"
          style={{marginTop:10 }}
        />
      </AccordionDetails>
    </Accordion>
  )
}

function ShowCat(props) {
  const classes = useStyles();
  const [cat, setCat] = useState({id: '', name: ''})
  const [subCats, setSubCats] = useState([])
  const [pages, setPages] = useState([])

  function deleteCat() {
    fetch("http://localhost:3000/delete/category/"+cat.id)
    .then(res => res.json())
    .then((result) => {
      console.log("fetch: ", typeof(result), result)
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }

  useEffect(() => {
    fetch("http://localhost:3000/category/"+props.id)
    .then(res => res.json())
    .then((result) => {
      console.log("fetch: ", typeof(result), result)
      setCat(result)
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/category/"+props.id+"/children")
    // .then((res) => {console.log("RES: ", res)})
    .then(res => res.json())
    .then((result) => {
      // tmp = addChildren(result.find((el) => el.parent_id === null), result)
      console.log("fetch: ", typeof(result), result)
      // setCats(result)
      setSubCats(result)
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/category/"+props.id+"/pages")
    .then(res => res.json())
    .then((result) => {
      console.log("fetch: ", typeof(result), result)
      setPages(result)
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }, [])

  return(
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <FolderIcon style={{marginRight: 10}} />
        Category: {cat.id} - {cat.name}
        <AddIcon
          style={{position: "absolute", right: 50}}
          onClick={() => {props.addPageFunc(cat.id)}}
        />
        {/*<DeleteIcon
          style={{position: "absolute", right: 50}}
          // onClick={deleteCat}
        />*/}
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {subCats.map(cat => (<ShowCat id={cat.id} key={cat.id} addPageFunc={props.addPageFunc} />))}
        {pages.map(page => (<ShowPage page={page} key={page.id} />))}
      </AccordionDetails>
    </Accordion>
  )
}

function ViewCat() {
  const [cats, setCats] = useState([]);
  const [list, setList] = useState(<div></div>)

  function addChildren(parent, cats, depth) {
    // console.log('\t'.repeat(depth) + "Parent: ", parent)
    let pid = parent.id;
    return (<div style={{border: "1px #000 solid", paddingLeft: "20px", marginTop: "5px", textAlign: "left"}}>
      Category: {parent.name}
      {console.log(cats.filter(cat => cat.parent_id === pid).map((item, i) => {
        // console.log('\t'.repeat(depth) + "\tChild: ", item)
        return(addChildren(item, cats, depth+1))
      }))}
      {cats.filter(cat => cat.parent_id === pid).map((item, i) => {
        // console.log('\t'.repeat(depth) + "\tChild: ", item)
        return(addChildren(item, cats, depth+1))
      })
      }
    </div>)
  }

  useEffect(() => {
    fetch("http://localhost:3000/category")
    // .then((res) => {console.log("RES: ", res)})
    .then(res => res.json())
    .then((result) => {
      // tmp = addChildren(result.find((el) => el.parent_id === null), result)
      console.log("fetch: ", typeof(result), result)
      // setCats(result)
      setList(addChildren(result.find((el) => el.parent_id === null), result, 0))
      },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }, [])

  return (
    <Grid item xs={12}>
    <Paper>
      <p>Categories:</p>
      <br />
      {list}
    </Paper>
    </Grid>
  )
}

function BookmarkImport() {
  return (
    <Grid item xs={12}>
      <Paper>
        <TextField
          name="upload-bookmarks-moz"
          type="file"
        />
      </Paper>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  accordion: {
    // border: "1px solid #000",
    boxShadow: "2px 2px 1px -1px rgba(0,0,0,0.3),0px 0px 1px 0px rgba(0,0,0,0.24),1px 1px 3px 0px rgba(0,0,0,0.22)",
  },
}));

export default function Dashboard() {
  const [openCatDialog, setOpenCatDialog] = React.useState(false)
  const [openPageDialog, setOpenPageDialog] = React.useState(false)
  const [pageDialogPid, setPageDialogPid] = React.useState(1)
  const [openErrSnackbar, setOpenErrSnackbar] = React.useState(false)
  const [errSnackbarMsg, setErrSnackbarMsg] = React.useState("")
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [page, setPage] = React.useState("pages");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  let pageElem = <div></div>

  switch (page) {
    case "pages":
      pageElem = (
        <Grid item xs={12}>
        <ShowCat id={1} addPageFunc={(pid) => {
          setPageDialogPid(pid)
          setOpenPageDialog(true)
        }}/>
        </Grid>
      )
      break
    case "import":
      pageElem = <BookmarkImport />
      break
    default:
      break
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <img src={logoImg} alt="project logo" height={50} style={{transform: "rotate(-5deg)", marginRight: 10}} />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            pywb scrapbook
          </Typography>
          {/*<IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={() => {setPage("pages")}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Capture" />
            </ListItem>
            <ListItem button onClick={() => {setPage("import")}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Import" />
            </ListItem>
            <ListItem button onClick={() => {setOpenCatDialog(true)}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Add Category" />
            </ListItem>
            <ListItem button onClick={() => {setOpenPageDialog(true)}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Add Page" />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <CreateCategoryDialog
            open={openCatDialog}
            closeFunc={() => {setOpenCatDialog(false)}}
          />
          <CreatePageDialog
            open={openPageDialog}
            closeFunc={() => {setOpenPageDialog(false)}}
            errFunc={(msg) => {
              setErrSnackbarMsg(msg)
              setOpenErrSnackbar(true)
            }}
            pid={pageDialogPid}
            pidFunc={(newpid) => {setPageDialogPid(newpid)}}
          />
          <Grid container spacing={3}>
            {pageElem}
          </Grid>
          <Box pt={4}>
            No Copyright
          </Box>
        </Container>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openErrSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrSnackbar(false)}
        message={errSnackbarMsg}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenErrSnackbar(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      </main>
    </div>
  );
}
