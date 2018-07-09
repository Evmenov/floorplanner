import React from 'react';
import PropTypes from 'prop-types';
import {MdFolderOpen } from 'react-icons/lib/md';
import IconLoad from 'react-icons/lib/fa/folder-open-o';
import ToolbarButton from './toolbar-button';
import {browserUpload}  from '../../utils/browser';

export default function ToolbarLoadButton({state}, {translator, projectActions}) {

  let jss = {

    "jsonstring":{
    "unit":"cm",
      "layers":{
      "layer-1":{
        "id":"layer-1",
          "altitude":0,
          "order":0,
          "opacity":1,
          "name":"default",
          "visible":true,
          "vertices":{
          "Bk-tqIExem":{
            "id":"Bk-tqIExem",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":497.57395253015875,
              "y":1767.4971089526694,
              "lines":[
              "ByxF9I4xg7",
              "BkGtqLNllm",
              "HJQt5LVlem"
            ],
              "areas":[
              "rkEY9UElxQ",
              "B1IgjLNllm"
            ]
          },
          "HyXLqUNeem":{
            "id":"HyXLqUNeem",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":704.6777429195349,
              "y":1601.530372818717,
              "lines":[
              "rkGUc8Vll7",
              "rkUGknWZm"
            ],
              "areas":[
              "rkEY9UElxQ",
              "B1IgjLNllm"
            ]
          },
          "rJgmKLNgg7":{
            "id":"rJgmKLNgg7",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":497.57395253015875,
              "y":1500.815515848541,
              "lines":[
              "SJIc84xgm",
              "rygtwm_Zm"
            ],
              "areas":[
              "B1IgjLNllm"
            ]
          },
          "Sk4_KLVexm":{
            "id":"Sk4_KLVexm",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":1097.6075370144476,
              "y":1500.815515848541,
              "lines":[
              "rk5a2PrWm",
              "H1WlFPQ_Zm"
            ],
              "areas":[
              "BJwxiLNlxm"
            ]
          },
          "BJmgoUVxlm":{
            "id":"BJmgoUVxlm",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":802.5555616651991,
              "y":1500.815515848541,
              "lines":[
              "rygtwm_Zm",
              "H1WlFPQ_Zm",
              "ByzgKw7OW7"
            ],
              "areas":[
              "B1IgjLNllm",
              "BJwxiLNlxm"
            ]
          },
          "ByxwYLEegQ":{
            "id":"ByxwYLEegQ",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":1097.6075370144476,
              "y":1898.0008672802214,
              "lines":[
              "rk5a2PrWm",
              "B1fcTnwSb7"
            ],
              "areas":[
              "BJwxiLNlxm"
            ]
          },
          "Byges8EexQ":{
            "id":"Byges8EexQ",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":802.5555616651991,
              "y":1898.0008672802214,
              "lines":[
              "SJgcphDH-7",
              "B1fcTnwSb7",
              "ByzgKw7OW7"
            ],
              "areas":[
              "B1IgjLNllm",
              "BJwxiLNlxm"
            ]
          },
          "By-7KLNexX":{
            "id":"By-7KLNexX",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":497.57395253015875,
              "y":1898.0008672802214,
              "lines":[
              "ByxF9I4xg7",
              "SJgcphDH-7"
            ],
              "areas":[
              "B1IgjLNllm"
            ]
          },
          "rJe_qLVxl7":{
            "id":"rJe_qLVxl7",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":704.6777429195349,
              "y":1767.4971089526694,
              "lines":[
              "HJQt5LVlem",
              "rkUGknWZm"
            ],
              "areas":[
              "rkEY9UElxQ",
              "B1IgjLNllm"
            ]
          },
          "rklU9LVlgX":{
            "id":"rklU9LVlgX",
              "type":"",
              "prototype":"vertices",
              "name":"Vertex",
              "misc":{

            },
            "selected":false,
              "properties":{

            },
            "x":497.57395253015875,
              "y":1601.530372818717,
              "lines":[
              "SJIc84xgm",
              "rkGUc8Vll7",
              "BkGtqLNllm"
            ],
              "areas":[
              "rkEY9UElxQ",
              "B1IgjLNllm"
            ]
          }
        },
        "lines":{
          "rk5a2PrWm":{
            "id":"rk5a2PrWm",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "Sk4_KLVexm",
              "ByxwYLEegQ"
            ],
              "holes":[

            ]
          },
          "rygtwm_Zm":{
            "id":"rygtwm_Zm",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "rJgmKLNgg7",
              "BJmgoUVxlm"
            ],
              "holes":[
              "rkegtvXubm"
            ]
          },
          "ByzgKw7OW7":{
            "id":"ByzgKw7OW7",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "BJmgoUVxlm",
              "Byges8EexQ"
            ],
              "holes":[
              "BkmxKDmO-Q"
            ]
          },
          "H1WlFPQ_Zm":{
            "id":"H1WlFPQ_Zm",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "BJmgoUVxlm",
              "Sk4_KLVexm"
            ],
              "holes":[

            ]
          },
          "ByxF9I4xg7":{
            "id":"ByxF9I4xg7",
              "type":"wall",
              "prototype":"lines",
              "name":"Wall",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "By-7KLNexX",
              "Bk-tqIExem"
            ],
              "holes":[

            ]
          },
          "BkGtqLNllm":{
            "id":"BkGtqLNllm",
              "type":"wall",
              "prototype":"lines",
              "name":"Wall",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "rklU9LVlgX",
              "Bk-tqIExem"
            ],
              "holes":[

            ]
          },
          "SJIc84xgm":{
            "id":"SJIc84xgm",
              "type":"wall",
              "prototype":"lines",
              "name":"Wall",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "rJgmKLNgg7",
              "rklU9LVlgX"
            ],
              "holes":[

            ]
          },
          "B1fcTnwSb7":{
            "id":"B1fcTnwSb7",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":12,
                  "_length":"12",
                  "_unit":"cm"
              }
            },
            "vertices":[
              "Byges8EexQ",
              "ByxwYLEegQ"
            ],
              "holes":[
              "Hk7c62vrZQ"
            ]
          },
          "SJgcphDH-7":{
            "id":"SJgcphDH-7",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":12,
                  "_length":"12",
                  "_unit":"cm"
              }
            },
            "vertices":[
              "By-7KLNexX",
              "Byges8EexQ"
            ],
              "holes":[
              "HkW96hPHbX"
            ]
          },
          "HJQt5LVlem":{
            "id":"HJQt5LVlem",
              "type":"wall",
              "prototype":"lines",
              "name":"Wall",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "Bk-tqIExem",
              "rJe_qLVxl7"
            ],
              "holes":[

            ]
          },
          "rkUGknWZm":{
            "id":"rkUGknWZm",
              "type":"wall",
              "prototype":"lines",
              "name":"Стена",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "HyXLqUNeem",
              "rJe_qLVxl7"
            ],
              "holes":[
              "S1gUM12ZbX"
            ]
          },
          "rkGUc8Vll7":{
            "id":"rkGUc8Vll7",
              "type":"wall",
              "prototype":"lines",
              "name":"Wall",
              "misc":{

            },
            "selected":false,
              "properties":{
              "thickness":{
                "length":3
              }
            },
            "vertices":[
              "rklU9LVlgX",
              "HyXLqUNeem"
            ],
              "holes":[

            ]
          }
        },
        "holes":{
          "Hk7c62vrZQ":{
            "id":"Hk7c62vrZQ",
              "type":"window",
              "prototype":"holes",
              "name":"Окно",
              "misc":{

            },
            "selected":false,
              "properties":{
              "width":{
                "length":180,
                  "_length":"180",
                  "_unit":"cm"
              },
              "height":{
                "length":150,
                  "_length":"150",
                  "_unit":"cm"
              },
              "thickness":{
                "length":12,
                  "_length":"12",
                  "_unit":"cm"
              }
            },
            "offset":0.4928322155154068,
              "line":"B1fcTnwSb7"
          },
          "rkegtvXubm":{
            "id":"rkegtvXubm",
              "type":"door",
              "prototype":"holes",
              "name":"Дверь",
              "misc":{

            },
            "selected":false,
              "properties":{
              "width":{
                "length":80
              },
              "height":{
                "length":215
              },
              "thickness":{
                "length":30
              },
              "flip_orizzontal":false
            },
            "offset":0.22325581395348848,
              "line":"rygtwm_Zm"
          },
          "S1gUM12ZbX":{
            "id":"S1gUM12ZbX",
              "type":"door",
              "prototype":"holes",
              "name":"Дверь",
              "misc":{

            },
            "selected":false,
              "properties":{
              "width":{
                "length":50,
                  "_length":"50",
                  "_unit":"cm"
              },
              "height":{
                "length":215
              },
              "thickness":{
                "length":20,
                  "_length":"20",
                  "_unit":"cm"
              },
              "flip_orizzontal":false
            },
            "offset":0.24986710076537663,
              "line":"rkUGknWZm"
          },
          "HkW96hPHbX":{
            "id":"HkW96hPHbX",
              "type":"window",
              "prototype":"holes",
              "name":"Окно",
              "misc":{

            },
            "selected":false,
              "properties":{
              "width":{
                "length":120,
                  "_length":"120",
                  "_unit":"cm"
              },
              "height":{
                "length":100
              },
              "thickness":{
                "length":10
              }
            },
            "offset":0.5023255813953489,
              "line":"SJgcphDH-7"
          },
          "BkmxKDmO-Q":{
            "id":"BkmxKDmO-Q",
              "type":"door",
              "prototype":"holes",
              "name":"Дверь",
              "misc":{

            },
            "selected":false,
              "properties":{
              "width":{
                "length":60,
                  "_length":"60",
                  "_unit":"cm"
              },
              "height":{
                "length":215
              },
              "thickness":{
                "length":30
              },
              "flip_orizzontal":true
            },
            "offset":0.16159831655447968,
              "line":"ByzgKw7OW7"
          }
        },
        "areas":{
          "rkEY9UElxQ":{
            "id":"rkEY9UElxQ",
              "type":"area",
              "prototype":"areas",
              "name":"Area",
              "misc":{

            },
            "selected":false,
              "properties":{
              "patternColor":"#6adb84",
                "agent":"none"
            },
            "vertices":[
              "rJe_qLVxl7",
              "Bk-tqIExem",
              "rklU9LVlgX",
              "HyXLqUNeem"
            ],
              "holes":[

            ]
          },
          "B1IgjLNllm":{
            "id":"B1IgjLNllm",
              "type":"area",
              "prototype":"areas",
              "name":"Area",
              "misc":{

            },
            "selected":false,
              "properties":{
              "patternColor":"#f5f4f4",
                "agent":"none"
            },
            "vertices":[
              "Bk-tqIExem",
              "rJe_qLVxl7",
              "HyXLqUNeem",
              "rklU9LVlgX",
              "rJgmKLNgg7",
              "BJmgoUVxlm",
              "Byges8EexQ",
              "By-7KLNexX"
            ],
              "holes":[

            ]
          },
          "BJwxiLNlxm":{
            "id":"BJwxiLNlxm",
              "type":"area",
              "prototype":"areas",
              "name":"Area",
              "misc":{

            },
            "selected":false,
              "properties":{
              "patternColor":"#df1e88",
                "agent":"1"
            },
            "vertices":[
              "BJmgoUVxlm",
              "Sk4_KLVexm",
              "ByxwYLEegQ",
              "Byges8EexQ"
            ],
              "holes":[

            ]
          }
        },
        "items":{

        },
        "selected":{
          "vertices":[

          ],
            "lines":[

          ],
            "holes":[

          ],
            "areas":[

          ],
            "items":[

          ]
        }
      }
    },
    "guides":{
      "h1":{
        "id":"h1",
          "type":"horizontal-streak",
          "properties":{
          "step":20,
            "colors":[
            "#808080",
            "#ddd",
            "#ddd",
            "#ddd",
            "#ddd"
          ]
        }
      },
      "v1":{
        "id":"v1",
          "type":"vertical-streak",
          "properties":{
          "step":20,
            "colors":[
            "#808080",
            "#ddd",
            "#ddd",
            "#ddd",
            "#ddd"
          ]
        }
      }
    },
    "selectedLayer":"layer-1",
      "width":3000,
      "height":2000,
      "meta":{

    }
  },
    "curlid":"50237c98-720c-4753-9d62-c9d294ad121c"
  };

  let loadProjectFromFile = event => {
    // event.preventDefault();
    // browserUpload().then((data) => {
    //   let parsed = JSON.parse(data);
      projectActions.loadProject(jss.jsonstring);
      // console.log(parsed.layers[0].ID);
    // });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <MdFolderOpen />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
