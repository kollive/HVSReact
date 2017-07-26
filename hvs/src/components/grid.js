import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { AgGridReact } from "ag-grid-react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import * as _ from 'lodash'

import '../../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid/dist/styles/theme-fresh.css';
//import '../../node_modules/ag-grid/dist/styles/theme-material.css';
//import '../../node_modules/ag-grid/dist/styles/theme-bootstrap.css';
import ItemList from './ItemList'

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


const font11 = {
  color: '#0b4981',
  fontFamily: 'Roboto,sans-serif',
  fontSize: '14px',
  margin: 12,
};

const styles = {
  title: {
    cursor: 'pointer',
  },
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
   radioButton: {
    marginTop: 16,
  },
};

/*
const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];*/

export class TableExampleComplex extends Component {

  //tableData = [];

  constructor(props) {
    super(props);  
    //console.log(props)
    // change the containing div to be inline-block (instead of the default block for a div)
    //props.reactContainer.style.display = "inline-block";
    // change the background color of the containing div to be red
    //props.reactContainer.style.backgroundColor = "red";
    this.onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
    this.onRowSelected= this.onRowSelected.bind(this);
    this.onCellClicked= this.onCellClicked.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
  }

  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: true,
    enableSelectAll: true,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '300px',
    columnDefs: this.createColumnDefs(),
    rowData: this.createRowData(),
    open: false,
    tableData :[]
  };

  onRowDoubleClicked(record){

    console.log(record);

    //this.tableData = _.toArray(record.data);
    //this.tableData.push(record.data)
    //console.log(this.tableData)
    this.setState({tableData: []});
    var newStateArray = this.state.tableData.slice();
    newStateArray.push(record.data);
    this.setState({tableData: newStateArray});

    //this.setState({tableData: true});
    this.handleOpen();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  createColumnDefs() {
    return [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" }
    ];
  }

  createRowData() {
    return [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
  }


  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  onRowSelected(data) {
    //console.log(data)
  }

  onCellClicked() {
  }

  gridOptions = {
    rowHeight: 48
  }

 handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    let containerStyle = {
      height: 120,
      width: '100%'
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (

      
      <div style={containerStyle} className="ag-fresh">
        <ItemList />
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Make">Make</TableHeaderColumn>
              <TableHeaderColumn tooltip="Model">Model</TableHeaderColumn>
              <TableHeaderColumn tooltip="Price">Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn >{index}</TableRowColumn>
                <TableRowColumn >{row.make}</TableRowColumn>
                <TableRowColumn >{row.model}</TableRowColumn>
                <TableRowColumn >{row.price}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>      
        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>       
      </div >
        </Dialog>
        <h1>Simple ag-Grid React Example</h1>
        <AgGridReact
          // listen for events with React callbacks
          onRowSelected={this.onRowSelected}
          onCellClicked={this.onCellClicked}
          onRowDoubleClicked={this.onRowDoubleClicked}
          // binding to properties within React State or Props
          showToolPanel={this.state.showToolPanel}
          quickFilterText={this.state.quickFilterText}
          icons={this.state.icons}

          // column definitions and row data are immutable, the grid
          // will update when these lists change
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}

          // or provide props the old way with no binding
          rowSelection="multiple"
          enableSorting="true"
          enableFilter="true"
          rowHeight="22"

          // events
          onGridReady={this.onGridReady}>
        </AgGridReact>
      </div>
    )

    {/*
      
      */
    }
  }
}


function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const AppBarExampleIcon = () => (
  <div>
  <AppBar
    title={<span style={styles.title}>HVS</span>}
    onTitleTouchTap={handleTouchTap}
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={<FlatButton label="Save" />}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
 /> 
  
  </div>
);

class GridList extends Component {

  render() {
    return (
      <div style={font11} style={{ width: '900px', height: "700px", margin: "50px auto 5px" }}>
        <Welcome name='Kolli'/>
        <AppBarExampleIcon />
        <h3> Hello</h3>
        
        <TableExampleComplex />
        
      </div>
    )
  }
}

GridList.getDefaultProps = { };


export default GridList;