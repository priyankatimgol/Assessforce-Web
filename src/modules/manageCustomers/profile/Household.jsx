import { createContext, useEffect, useRef, useState } from 'react';
import { Box, Card, Chip, Tooltip, Typography } from '@mui/material';
import Tree from 'react-d3-tree';
import ASButton from '../../../components/mainComponents/ASButton';
import hoh from '../../../assets/images/HOH.svg';
import hm from '../../../assets/images/HM.svg';
import HouseholdRelation from '../../../assets/images/HouseholdRelation.svg';
import householdphone from '../../../assets/images/householdphone.svg';
import householdemail from '../../../assets/images/householdemail.svg';
import CreateHMIcon from '../../../assets/customSVGIcons/customer/CreateHMIcon';
import { CREATE_HM } from '../../../utils/enums/CustomersEnums';
import CreateHM from '../components/CreateHM';

export const CustomersContext = createContext();
export const HMContext = createContext();

// Sample Data
const familyTreeData = {
  name: 'Francisco Lindor',
  attributes: {
    role: 'HOH',
    id: '17854',
    status: 'Imported',
    icon: hoh,
    details: { email: 'timothy_mueller99@gmail.com', phone: '999 991 2345' },
  },
  children: [
    {
      name: 'John Lindor',
      attributes: {
        role: 'HM',
        id: '17854',
        status: 'IN HOUSEHOLD',
        icon: hm,
        details: { relation: 'Brother', email: 'roman@gmail.com', phone: '999 991 2345' },
      },
      children: [
        {
          name: 'Lily Lindor',
          attributes: {
            role: 'HM',
            id: '17854',
            status: 'IN HOUSEHOLD',
            icon: hm,
            details: { relation: 'Sister', email: 'roman@gmail.com', phone: '999 991 2345' },
          },
        },
      ],
    },
    {
      name: 'Mary Lindor',
      attributes: {
        role: 'HM',
        id: '17854',
        status: 'NOT IN HOUSEHOLD',
        icon: hm,
        details: { relation: 'Mother', email: 'roman@gmail.com', phone: '999 991 2345' },
      },
    },
  ],
};

const getNodeHeight = (nodeDatum) => {
  let baseHeight = 120; // Base height for small content
  if (nodeDatum.attributes.email || nodeDatum.attributes.phone) {
    baseHeight += 30; // Add height for contact info
  }
  return baseHeight;
};

// Custom Node Renderer
const renderForeignObjectNode = ({ nodeDatum, x, y }) => {
  const nodeHeight = getNodeHeight(nodeDatum); // Calculate dynamic height
  console.log('nodeHeight', nodeHeight);
  return (
    <>
      {/* Adjust link position based on height */}
      <path d={`M${x},${y + 60} L${x},${y + nodeHeight}`} fill="none" strokeWidth="2" markerEnd={nodeDatum.depth === 0 ? "url(#dot)" : "none"} />


      {/* Render Node */}
      <foreignObject width="360" height="220" x="-180" y="5">
        <Card
          sx={{
            borderRadius: 1,
            border: '1px solid var(--success-states-selected)',
            boxShadow: 2,
            // marginTop:'20px'
          }}
        >
          <Box sx={{ padding: '4px !important' }}>
            <Box
              display="flex"
              alignItems="flex-start"
              gap={1.75}
              sx={{
                backgroundColor:
                  nodeDatum.attributes.status === 'Imported'
                    ? 'var(--primary-states-focus)'
                    : nodeDatum.attributes.status === 'IN HOUSEHOLD'
                      ? 'var(--success-states-selected)'
                      : 'var(--error-states-selected)',
                padding: '10px 8px 10px 12px',
                borderRadius: '4px',
              }}
            >
              <img
                src={nodeDatum.attributes.icon}
                alt={`${nodeDatum.attributes.role} Icon`}
                width={32}
                height={32}
              />

              <Box>
                <Typography
                  variant="subtitle1"
                  width="100%"
                  color="var(--black-color)"
                  fontSize="1rem"
                  lineHeight="20px"
                  fontFamily="inter-semibold"
                >
                  {nodeDatum.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="var(--text-secondary-color)"
                  width="100%"
                  fontFamily="inter-medium"
                  fontSize="0.75rem"
                  sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <span>{nodeDatum.attributes.role}</span>
                  <span>•</span>
                  <span>ID: {nodeDatum.attributes.id}</span>
                </Typography>

                <Typography>
                  <Chip
                    label={nodeDatum.attributes.status}
                    sx={{
                      fontSize: '0.75rem',
                      backgroundColor:
                        nodeDatum.attributes.status === 'IN HOUSEHOLD'
                          ? 'var(--success-states-selected)'
                          : nodeDatum.attributes.status === 'Imported'
                            ? 'var(--error-main)'
                            : 'var(--error-states-selected)',

                      color:
                        nodeDatum.attributes.status === 'IN HOUSEHOLD'
                          ? 'var(--success-main)'
                          : nodeDatum.attributes.status === 'Imported'
                            ? 'var(--error-contrastText)'
                            : 'var(--error-main)',

                      borderRadius: '100px',

                      border:
                        nodeDatum.attributes.status === 'IN HOUSEHOLD'
                          ? '1px solid var(--success-main)'
                          : nodeDatum.attributes.status === 'Imported'
                            ? '1px solid var(--error-main)'
                            : '1px solid var(--error-main)',
                    }}
                    size="small"
                  />
                </Typography>
              </Box>
            </Box>

            {/* Contact Info */}
            {nodeDatum?.attributes?.details?.relation && (
              <Box display="flex" alignItems="center" mt={0.5}>
                <img
                  src={HouseholdRelation}
                  alt='email'
                  width={16}
                  height={16}
                  style={{ marginLeft: '12px' }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    paddingLeft: '14px',
                    color: 'var(--heading-color)',
                    fontFamily: 'inter-regular !important',
                    fontSize: '0.75rem',
                    fontStyle: 'normal',
                    lineHeight: '18px',
                  }}
                >
                  {nodeDatum.attributes.details.relation}
                </Typography>
              </Box>
            )}

            {nodeDatum?.attributes?.details?.email && (
              <Box display="flex" alignItems="center" mt={1}>
                <img
                  src={householdemail}
                  alt='email'
                  width={16}
                  height={16}
                  style={{ marginLeft: '12px' }}
                />
                <Typography
                  sx={{
                    paddingLeft: '14px',
                    color: 'var(--heading-color)',
                    fontFamily: 'inter-regular !important',
                    fontSize: '0.75rem',
                    fontStyle: 'normal',
                    lineHeight: '18px',
                  }}
                >
                  {nodeDatum.attributes.details.email}
                </Typography>
              </Box>
            )}

            {nodeDatum?.attributes?.details?.phone && (
              <Box display="flex" alignItems="center" mt={1}>
                <img
                  src={householdphone}
                  alt='email'
                  width={16}
                  height={16}
                  style={{ marginLeft: '12px' }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    paddingLeft: '14px',
                    color: 'var(--heading-color)',
                    fontFamily: 'inter-regular !important',
                    fontSize: '0.75rem',
                    fontStyle: 'normal',
                    lineHeight: '18px',
                  }}
                >
                  {nodeDatum.attributes.details.phone}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </foreignObject>
    </>
  );
};

const Household = () => {
  const treeContainerRef = useRef(null);
  // const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedOptionForEdit, setSelectedOptionForEdit] = useState(null);
  // useEffect(() => {
  //   if (treeContainerRef.current) {
  //     const dimensions = treeContainerRef.current.getBoundingClientRect();
  //     setTranslate({ x: dimensions.width / 2, y: 100 });
  //   }
  // }, []);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.9,
    });
  }, []);

  const handleCreateHM = () => {
    setOpen(true);
    setSelectedOption({ label: CREATE_HM, value: CREATE_HM });
  };

  return (
    <>
      <HMContext.Provider value={{ open, setOpen, selectedOption, selectedOptionForEdit }}>
        <CreateHM />
      </HMContext.Provider>


      <Box ref={treeContainerRef} sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <marker
              id="dot"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L10,5 L0,10" fill="#3F51B5" />
            </marker>
          </defs>
        </svg> */}
        {/* SVG Defs for Dot Marker */}
        <svg style={{ width: 0, height: 0 }}>
          <defs>
            <marker
              id="dot"
              markerWidth="5"
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <circle cx="2.5" cy="2.5" r="2.5" fill="#3F51B5" />
            </marker>
          </defs>
        </svg>
        <div className="ma-title" style={{ padding: '0px 20px' }}>
          <Typography variant="h5" fontFamily="inter-semibold" marginBottom={{ xs: 2, md: 0 }}>
            Manage Organizations
          </Typography>
          <ASButton
            variant="contained"
            startIcon={<CreateHMIcon />}
            onClick={() => {
              handleCreateHM();
            }}
            style={{ textTransform: 'capitalize' }}
            tooltip='Create an HM'
          >
            Create HM
          </ASButton>
        </div>
        <Tree
          data={familyTreeData}
          translate={{ x: dimensions.width / 2, y: 100 }}
          pathFunc="step" // Ensures links flow naturally
          renderCustomNodeElement={renderForeignObjectNode}
          orientation="verticle"
          draggable={false}
          zoomable={false}
          nodeSize={{ x: 200, y: 220 }} // Adjust spacing
          separation={{ siblings: 3, nonSiblings: 2 }}///gap between box
          pathClassFunc={() => 'tree-link'}
          enableLegacyTransitions={true} // Smooth animations
        />
      </Box>
    </>
  );
};

export default Household;
