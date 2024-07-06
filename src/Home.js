import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Tree from "react-d3-tree";
import { getProfile } from "./api/interceptor";

const containerStyles = {
  width: "100%",
  height: "100vh",
};

const linkStyle = {
  stroke: "red",
  strokeWidth: 2,
};

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setProfile(data.client); // Assuming your profile data structure has a 'client' key containing the necessary data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (profile) {
      const tree = convertToTreeData(profile.tree);
      setTreeData(tree);
    }
  }, [profile]);

  const convertToTreeData = (data) => {
    const convertNode = (node, depth = 0) => {
      const { email, children } = node;

      const colors = ["#FF6347", "#FF7F50", "#FFD700", "#ADFF2F", "#7FFF00"];
      const color = colors[depth % colors.length];

      const treeNode = {
        name: email, // Display only email in the tree node
        attributes: {
          Email: email,
          Coin: node.coin,
          RefferalCoin: node.refferalCoin,
          LevelCoin: node.levelCoin,
          JoiningAmount: node.joiningAmount,
          ParentId: node.parentId,
          Level: node.level,
          Layer: node.layer,
          RefferalToken: node.refferalToken,
        },
        nodeSvgShape: {
          shape: "circle",
          shapeProps: {
            r: 10,
            fill: color,
          },
        },
        children: children.map((child) => convertNode(child, depth + 1)),
      };

      return treeNode;
    };

    return [convertNode(data)];
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <h2>Profile</h2>
        <strong>
          Name:
          {profile && profile.name}
        </strong>
        <strong> Email:{profile && profile.email}</strong>
        <strong>
          {" "}
          coins:
          {profile && profile.coin + profile.refferalCoin + profile.levelCoin}
        </strong>
        <strong>
          {" "}
          level coins:
          {profile && profile.refferalCoin}
        </strong>
        <strong>
          {" "}
          Refferal coins:
          {profile && profile.refferalCoin}
        </strong>
        <div style={containerStyles}>
          {treeData && (
            <Tree
              data={treeData}
              orientation="vertical"
              styles={{ links: linkStyle }}
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default Home;
