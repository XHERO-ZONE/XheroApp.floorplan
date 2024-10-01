import React from "react";
import PropTypes from "prop-types";
import { Seq } from "immutable";
import { FormLabel, FormSelect } from "../../components/style/export";
import PropertyStyle from "./shared-property-style";

export default function PropertyEnum({
  value,
  onUpdate,
  configs,
  sourceElement,
  internalState,
  state,
}) {
  let update = (val) => {
    if (configs.hook) {
      return configs
        .hook(val, sourceElement, internalState, state)
        .then((_val) => {
          return onUpdate(_val);
        });
    }

    return onUpdate(val);
  };
  let dataMaterial = [
    {
      name: "",
      img: "",
    },
    {
      name: "Đá Granit",
      img: require("../../../public/images/Granit.png"),
    },
    {
      name: "Đá cẩm thạch",
      img: require("../../../public/images/marble.png"),
    },
    {
      name: "Gạch lát",
      img: require("../../../public/images/tiles.png"),
    },
    {
      name: "Vân gỗ",
      img: require("../../../public/images/wood.png"),
    },
    {
      name: "Đá lát nền",
      img: require("../../../public/images/pavingStone.png"),
    },
    {
      name: "Đá",
      img: require("../../../public/images/patternedTiles.png"),
    },
    {
      name: "Gạch hoa văn",
      img: require("../../../public/images/stone.png"),
    },

  ];
  const WrapperMaterial = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    width: "100%"
  };
  return (
    <table className="PropertyEnum" style={{...PropertyStyle.tableStyle, padding: 0}}>
      <tbody>
        <tr>
          {/* <td style={PropertyStyle.firstTdStyle}><FormLabel>{configs.label}</FormLabel></td> */}
          <td>
            <div style={WrapperMaterial}>
              {Seq(configs.values)
                .entrySeq()
                .map(([key, value], index) => (
                  <div
                    key={key}
                    style={{
                      borderRadius: "4px",
                      position: "relative",
                      background: `url(${dataMaterial[index].img})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      width: "80px",
                      height: 85,
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                    onClick={() => update(key)}
                  ></div>
                ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PropertyEnum.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired,
};
