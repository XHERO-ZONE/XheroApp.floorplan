import React, { Component } from "react";
import PropTypes from "prop-types";
import CatalogItem from "./catalog-item";
import CatalogBreadcrumb from "./catalog-breadcrumb";
import CatalogPageItem from "./catalog-page-item";
import CatalogTurnBackPageItem from "./catalog-turn-back-page-item";
import ContentContainer from "../style/content-container";
import ContentTitle from "../style/content-title";
import * as SharedStyle from "../../shared-style";
import Translator from "../../translator/translator";
import { linesActions } from "../../actions/export";
let bgToolBar = require("../../../public/images/bgToolBar.png");

let translator = new Translator();
const containerStyle = {
  position: "fixed",
  // width:'calc( 100% - 51px)',
  height: "calc( 100% - 20px)",
  backgroundImage: `url(${bgToolBar}`,
  right: 0,
  overflowY: "auto",
  overflowX: "hidden",
  zIndex: 10,
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  zIndex: "9998"
};

const itemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gridGap: "10px",
  marginTop: "1em",
  width: "100%",
  // padding: "0 10px",
  justifyContent: "center",
};

const searchContainer = {
  width: "100%",
  height: "3em",
  padding: "0.625em",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)",
  borderRadius: "2px",
  transition: "all .2s ease-in-out",
  WebkitTransition: "all .2s ease-in-out",
  marginBottom: "1em",
};

const searchText = {
  width: "8em",
  display: "inline-block",
};

const searchInput = {
  width: "calc( 100% - 10em )",
  height: "2em",
  margin: "0",
  padding: "0 1em",
  border: "1px solid #EEE",
};

const historyContainer = {
  ...searchContainer,
  padding: "0.2em 0.625em",
};

const historyElementStyle = {
  width: "auto",
  height: "2em",
  lineHeight: "2em",
  textAlign: "center",
  borderRadius: "1em",
  display: "inline-block",
  cursor: "pointer",
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  color: SharedStyle.PRIMARY_COLOR.text_main,
  textTransform: "capitalize",
  margin: "0.25em",
  padding: "0 1em",
};

const styleToolBar = {
  backgroundImage: `url(${bgToolBar}`,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-epeat",
  width: "200px",
  padding: "20px",
  height: "100%",
  position: "absolute",
  right: "56px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  zIndex: "10004"
};

export default class CatalogList extends Component {
  constructor(props, context) {
    super(props);

    let page = props.page;
    let currentCategory = context.catalog.getCategory(page);
    let categoriesToDisplay = currentCategory.categories;
    let elementsToDisplay = currentCategory.elements.filter((element) =>
      element.info.visibility ? element.info.visibility.catalog : true
    );
    this.changeType = this.changeType.bind(this);
    this.handleOpenCatolog = this.handleOpenCatolog.bind(this);
    this.state = {
      categories: currentCategory.categories,
      elements: elementsToDisplay,
      matchString: "",
      matchedElements: [],
      type: "texture",
      openCatlog: false,
    };
  }

  flattenCategories(categories) {
    let toRet = [];

    for (let x = 0; x < categories.length; x++) {
      let curr = categories[x];
      toRet = toRet.concat(curr.elements);
      if (curr.categories.length)
        toRet = toRet.concat(this.flattenCategories(curr.categories));
    }

    return toRet;
  }

  removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  handleOpenCatolog() {
    this.setState({ openCatlog: !this.state.openCatlog });
  }
  matcharray(text) {
    let array = this.state.elements.concat(
      this.flattenCategories(this.state.categories)
    );
    let filtered = [];

    if (text != "") {
      let regexp = new RegExp(text, "i");
      for (let i = 0; i < array.length; i++) {
        let title = translator.t(array[i].info.title);
        let titleNoDiacritics = this.removeDiacritics(title);
        if (regexp.test(titleNoDiacritics)) {
          filtered.push(array[i]);
        } else {
          let titleLowerCase = title.toLowerCase();
          let textLowerCase = text.toLowerCase();
          if (titleLowerCase.includes(textLowerCase)) {
            filtered.push(array[i]);
          }
        }
      }
    }

    this.setState({
      matchString: text,
      matchedElements: filtered,
    });
  }
  changeType(newType) {
    this.setState({ type: newType });
  }
  drawLine() {
    linesActions.beginDrawingLine(200, 100)
  }
  select(element) {
    switch (element.prototype) {
      case "lines":
        this.context.linesActions.selectToolDrawingLine(element.name);
        break;
      case "items":
        this.context.itemsActions.selectToolDrawingItem(element.name);
        break;
      case "holes":
        this.context.holesActions.selectToolDrawingHole(element.name);
        break;
    }

    this.context.projectActions.pushLastSelectedCatalogElementToHistory(
      element
    );
  }
  render() {
    let page = this.state.type;
    let currentCategory = this.context.catalog.getCategory(page);
    let currentCategoryDefault = this.context.catalog.getCategory(this.props.page);
    let categoriesToDisplay = currentCategoryDefault.categories;
    let elementsToDisplay = currentCategory.elements.filter((element) =>
      element.info.visibility ? element.info.visibility.catalog : true
    );
    let breadcrumbComponent = null;
    let iconToolBar = require("../../../public/images/iconToolBar.png");
    let iconClose = require("../../../public/images/iconCloseToolBar.png");
    // if (page !== 'root') {

    //   let breadcrumbsNames = [];

    //   this.props.state.catalog.path.forEach(pathName => {
    //     breadcrumbsNames.push({
    //       name: this.context.catalog.getCategory(pathName).label,
    //       action: () => projectActions.goBackToCatalogPage(pathName)
    //     });
    //   });

    //   breadcrumbsNames.push({name: currentCategory.label, action: ''});

    //   breadcrumbComponent = (<CatalogBreadcrumb names={breadcrumbsNames}/>);
    // }

    // let pathSize = this.props.state.catalog.path.size;
    // console.log(this.props.state.catalog.path.size)

    // let turnBackButton = pathSize > 0 ? (
    //   <CatalogTurnBackPageItem key={pathSize} page={this.context.catalog.categories[this.props.state.catalog.path.get(pathSize - 1)]}/>) : null;

    // let selectedHistory = this.props.state.get('selectedElementsHistory');
    // let selectedHistoryElements = selectedHistory.map( ( el, ind ) =>
    //   <div key={ind} style={historyElementStyle} title={el.name} onClick={() => this.select(el) }>{el.name}</div>
    // );

    return (
      <div>
        <ContentContainer
          width={this.props.width}
          height={this.props.height}
          style={{ ...containerStyle, ...this.props.style }}
        >
          {/* <ContentTitle>{this.context.translator.t('Catalog')}</ContentTitle> */}
          {/* {breadcrumbComponent} */}
          {/* <div style={searchContainer}>
          <span style={searchText}>{this.context.translator.t('Search Element')}</span>
          <input type="text" style={searchInput} onChange={( e ) => { this.matcharray( e.target.value ); } }/>
        </div> */}
          {/* { selectedHistory.size ?
          <div style={historyContainer}>
            <span>{this.context.translator.t('Last Selected')}</span>
            {selectedHistoryElements}
          </div> :
          null
        } */}
          <div onClick={this.handleOpenCatolog}>
            {this.state.openCatlog === true ? (
              <img src={iconClose} width={40} height={40} />
            ) : (
              <img src={iconToolBar} width={40} height={40} />
            )}
          </div>
          <div style={itemsStyle}>
            {[
              // turnBackButton,
              // categoriesToDisplay.map((cat) => (
              //   <CatalogPageItem
              //     type={this.state.type}
              //     selectType={this.changeType}
              //     key={cat.name}
              //     page={cat}
              //     oldPage={currentCategory}
              //   />
              // )),
              elementsToDisplay.map((elem) => (
                <CatalogItem key={elem.name} element={elem} />
              )),
            ]}
          </div>
        </ContentContainer>
        {this.state.openCatlog === true ? (
          <div style={{ ...styleToolBar }}>
            {[
              categoriesToDisplay.map((cat) => (
                <CatalogPageItem
                  type={this.state.type}
                  selectType={this.changeType}
                  handleOpenCatolog={this.handleOpenCatolog}
                  key={cat.name}
                  page={cat}
                  oldPage={currentCategory}
                />
              )),
            ]}
          </div>
        ) : null}
      </div>
    );
  }
}

CatalogList.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
