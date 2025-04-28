import groupUser from './assets/images/grp_person.svg';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

export const profileRoles = [
  {
    id: 1,
    title: 'TANF Employment & Education Program',
    role: 'Support Staff',
  },
  { id: 2, title: 'Office of Work Opportunity', role: 'Supervisor' },
  {
    id: 3,
    title: 'Economic Security Administration and Family Services Administration Integration Project',
    role: 'Specialist',
  },
  { id: 4, title: 'SNAP Employment & Training', role: 'Specialist' },
  { id: 5, title: 'Call Center', role: 'Support Staff' },
  { id: 6, title: 'DC MOMS', role: 'Support Staff' },
];

export const imagesAndLogosData = {
  site_logo:
    'https://assessforce_d10.lndo.site/sites/default/files/logos/assessforce_10_17_2017_all_variations_tm_5.png',
  login_front_page_image:
    'https://assessforce_d10.lndo.site/sites/default/files/logos/663357_13a9d0ebb32d476a801e734e8ad4f01a_mv2_0.jpg',
};

export const manageUsersCards = [
  { id: 1, title: 'Total Users', count: 353, icon: groupUser },
  { id: 2, title: 'Activ Users', count: 264, icon: groupUser },
  { id: 3, title: 'Deactivated Users', count: 89, icon: groupUser },
  { id: 4, title: 'Supervisors', count: 173, icon: groupUser },
  { id: 5, title: 'Specialists', count: 60, icon: groupUser },
  { id: 6, title: 'Support Staff', count: 31, icon: groupUser },
];

export const accountsDetails = [
  {
    nid: 2161,
    name: 'State of Transylvania',
    director: 'Jalen Hurts',
    parent: '',
    status: 'Active',
  },
  {
    nid: 2162,
    name: 'Dracula County',
    director: 'Tom Brady',
    parent: 'State of Transylvania',
    status: 'Active',
  },
  {
    nid: 2165,
    name: 'Dracula County – Department of Human Services',
    director: 'Sandeep kumar',
    parent: 'State of Transylvania',
    status: 'Active',
  },
  {
    nid: 2169,
    name: 'new check updated json',
    director: 'Matthew Stafford',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 2171,
    name: 'Mavis County',
    director: 'Ryan Fitzpatrick',
    parent: 'State of Transylvania',
    status: 'Active',
  },
  {
    nid: 2178,
    name: 'Greatwill.org',
    director: 'Philip Rivers',
    parent: 'Dracula County – Department of Human Services',
    status: 'Active',
  },
  {
    nid: 2179,
    name: 'New Career Inc.',
    director: 'Bruce Arians',
    parent: 'Dracula County – Department of Human Services',
    status: 'Active',
  },
  {
    nid: 2180,
    name: 'Quasimodo County',
    director: 'Gary Kubiak',
    parent: 'State of Transylvania',
    status: 'Active',
  },
  {
    nid: 26808,
    name: 'Transylvania Department of Behavioral Health',
    director: '',
    parent: 'State of Transylvania',
    status: 'Deactived',
  },
  {
    nid: 27327,
    name: 'Education Department',
    director: '',
    parent: 'State of Transylvania',
    status: 'Active',
  },
  {
    nid: 27347,
    name: 'new title test well',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27348,
    name: 'new title test',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27349,
    name: 'new title testing',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27350,
    name: 'new title testing',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27351,
    name: 'new title testing',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27352,
    name: 'new title testing',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
  {
    nid: 27353,
    name: 'new title testing',
    director: '',
    parent: 'Dracula County',
    status: 'Active',
  },
];

export const orgKpiDetails = [
  {
    title: 'Organizations',
    data: [
      { title: 'Total', count: 102 },
      { title: 'Active', count: 68 },
      { title: 'Not Active', count: 34 },
    ],
  },
  {
    title: 'Partners',
    data: [
      { title: 'Total', count: 102 },
      { title: 'Active', count: 68 },
      { title: 'Not Active', count: 34 },
    ],
  },
  {
    title: 'Service Providers',
    data: [
      { title: 'Total', count: 102 },
      { title: 'Active', count: 68 },
      { title: 'Not Active', count: 34 },
    ],
  },
  {
    title: 'General Sponsors',
    data: [
      { title: 'Total', count: 102 },
      { title: 'Active', count: 68 },
      { title: 'Not Active', count: 34 },
    ],
  },

  {
    title: 'Self Soponsors',
    data: [
      { title: 'Total', count: 102 },
      { title: 'Active', count: 68 },
      { title: 'Not Active', count: 34 },
    ],
  },
];

export const orgListing = {
  data: {
    columns: {
      id: 'Organization ID',
      title: 'Organization Name',
      field_orgz_pc_name: 'Primary Contact Name',
      field_orgz_status: 'Partner Status',
      field_orgz_gen_sponser_status: 'General Sponsor Status',
      field_orgz_self_sponser_status: 'SelF Sponsor Status',
      field_orgz_service_pro_status: 'Service Provider Status',
      field_orgz_inc_department: 'Invoicing Contact Department',
      field_node_name: 'Organization Display Name',
    },
    default_columns: {
      id: 'Organization ID',
      title: 'Organization Name',
      field_orgz_pc_name: 'Primary Contact Name',
      field_orgz_status: 'Partner Status',
      field_orgz_gen_sponser_status: 'General Sponsor Status',
      field_orgz_self_sponser_status: 'SelF Sponsor Status',
      field_orgz_service_pro_status: 'Service Provider Status',
    },
    organizations: [
      {
        id: '26918',
        title: 'XYZ Partner',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: null,
      },
      {
        id: '26922',
        title: 'ABC Provider',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: null,
      },
      {
        id: '26965',
        title: '988 Suicide and Crisis Lifeline',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: '988 Suicide and Crisis Lifeline',
      },
      {
        id: '27309',
        title: 'Abbvie',
        field_orgz_pc_name: null,
        field_orgz_status: 'Not Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Abbvie',
      },
      {
        id: '26915',
        title: 'ABC Partner',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'ABC Partner',
      },
      {
        id: '27307',
        title: 'Blue Cross Blue Shield',
        field_orgz_pc_name: null,
        field_orgz_status: 'Not Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Blue Cross Blue Shield',
      },
      {
        id: '26966',
        title: 'Dakota Sleep Solutions',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Dakota Sleep Solutions',
      },
      {
        id: '26970',
        title: 'DC Department of Behavioral Health',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'DC DBH',
      },
      {
        id: '26936',
        title: 'DC Department of Health',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'DC DOH',
      },
      {
        id: '26911',
        title: 'Hoc Test',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'HOC T',
      },
      {
        id: '26927',
        title: 'Merck',
        field_orgz_pc_name: null,
        field_orgz_status: 'Not Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Merck',
      },
      {
        id: '27234',
        title: 'National Institute on Alcohol Abuse and Alcoholism',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'National Institute on Alcohol Abuse and Alcoholism',
      },
      {
        id: '26969',
        title: 'Peaceful Paths Counseling Services',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Peaceful Paths Counseling Services',
      },
      {
        id: '27310',
        title: 'Philadelphia Eagles',
        field_orgz_pc_name: null,
        field_orgz_status: 'Not Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Philadelphia Eagles',
      },
      {
        id: '27235',
        title: 'SAMHSA',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'SAMHSA',
      },
      {
        id: '26931',
        title: 'South Dakota Department of Health',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'SD DOH',
      },
      {
        id: '26930',
        title: 'South Dakota Department of Social Services',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'SD DSS',
      },
      {
        id: '26967',
        title: 'SleepCare South Dakota',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'SleepCare SD',
      },
      {
        id: '26964',
        title: 'South Dakota Division of Behavioral Health',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'South Dakota DBH',
      },
      {
        id: '26968',
        title: 'Tranquil Minds Therapy Center',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'Tranquil Minds Therapy Center',
      },
      {
        id: '27314',
        title: 'United Healthcare',
        field_orgz_pc_name: 'BCAD',
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Active',
        field_orgz_service_pro_status: 'Active',
        field_orgz_inc_department: null,
        field_node_name: 'United Health',
      },
      {
        id: '26925',
        title: 'XYZ Provider',
        field_orgz_pc_name: null,
        field_orgz_status: 'Active',
        field_orgz_gen_sponser_status: 'Not Active',
        field_orgz_self_sponser_status: 'Not Active',
        field_orgz_service_pro_status: 'Not Active',
        field_orgz_inc_department: null,
        field_node_name: 'XYZ Provider',
      },
    ],
    kpi: [
      {
        title: 'Organizations',
        data: [
          {
            title: 'Total',
            count: 25,
          },
          {
            title: 'Active',
            count: 12,
          },
          {
            title: 'Not Active',
            count: 13,
          },
        ],
      },
      {
        title: 'Partners',
        data: [
          {
            title: 'Total',
            count: 7,
          },
          {
            title: 'Active',
            count: 7,
          },
          {
            title: 'Not Active',
            count: 0,
          },
        ],
      },
      {
        title: 'Service Providers',
        data: [
          {
            title: 'Total',
            count: 12,
          },
          {
            title: 'Active',
            count: 1,
          },
          {
            title: 'Not Active',
            count: 11,
          },
        ],
      },
      {
        title: 'General Sponosors',
        data: [
          {
            title: 'Total',
            count: 1,
          },
          {
            title: 'Active',
            count: 0,
          },
          {
            title: 'Not Active',
            count: 1,
          },
        ],
      },
      {
        title: 'SelF Sponosors',
        data: [
          {
            title: 'Total',
            count: 5,
          },
          {
            title: 'Active',
            count: 4,
          },
          {
            title: 'Not Active',
            count: 1,
          },
        ],
      },
    ],
  },
  status: 'success',
};

export const orgViewDetails = {
  organizationInformation: {
    name: 'United Healthcare',
    displayName: 'United Health',
    taxStatus: 'GHF',
    taxId: '23-4255546',
    legalStatus: '-',
  },
  contactInformation: {
    primaryContact: {
      name: 'Anthony Carrigan',
      department: 'Dummy text dummy text',
      email: 'dummy@unitedhealthcare.com',
      mobile: '-',
      office: '-',
    },
  },
  invoicingInformation: {
    invoicingContact: {
      name: 'Anthony Carrigan',
      department: 'Dummy text dummy text',
      email: 'dummy@unitedhealthcare.com',
      mobile: '-',
      office: '-',
    },
    invoicingAddress: {
      address: '123, Water Gate Street, Suite 300, Dallas, TX, 78729',
    },
  },
  organizationType: [
    {
      type: 'Partner',
      status: 'Active',
      isEnabled: true,
    },
    {
      type: 'General Sponsor',
      status: 'Not Active',
      description:
        'Lorem ipsum dolor sit amet consectetur. Tortor iaculis curabitur turpis neque vel eget orci quis. Eu cras etiam massa nisi ipsum etiam praesent amet. Vel proin curabitur arcu tempor. Pharetra morbi elementum feugiat tincidunt.',
      isEnabled: true,
    },
  ],
};

export const newViewOrg = {
  data: {
    organizations: {
      info_type: [
        {
          group_title: 'Basic Organization Information',
          title: {
            label: 'Organization Name',
            value: 'United Healthcare',
          },
          field_node_name: {
            label: 'Organization Display Name',
            value: 'United Health',
          },
          field_orgz_tax_status: {
            label: 'Tax Status',
            value: '-',
          },
          field_orgz_legal_status: {
            label: 'Legal status',
            value: '-',
          },
          field_orgz_tax_id: {
            label: 'Tax ID',
            value: '-',
          },
        },
        {
          group_title: 'Contact Information',
          'Primary Contact': 'Primary Contact',
          field_orgz_pc_name: {
            label: 'Name',
            value: 'BCAD',
          },
          field_orgz_pc_title: {
            label: 'Title',
            value: '-',
          },
          field_orgz_pc_department: {
            label: 'Department',
            value: '-',
          },
          field_orgz_pc_email: {
            label: 'Email',
            value: '-',
          },
          field_orgz_pc_office_phone: {
            label: 'Office Phone',
            value: '-',
          },
          field_orgz_pc_extension: {
            label: 'Extension',
            value: '-',
          },
          field_orgz_pc_mobile_phone: {
            label: 'Mobile Phone',
            value: '-',
          },
          'Secondary Contact': 'Secondary Contact',
          field_orgz_sc_name: {
            label: 'Name',
            value: '-',
          },
          field_orgz_sc_title: {
            label: 'Title',
            value: '-',
          },
          field_orgz_sc_department: {
            label: 'Department',
            value: '-',
          },
          field_orgz_sc_email: {
            label: 'Email',
            value: '-',
          },
          field_orgz_sc_office_phone: {
            label: 'Office Phone',
            value: '-',
          },
          field_orgz_sc_extension: {
            label: 'Extension',
            value: '-',
          },
          field_orgz_sc_mobile_phone: {
            label: 'Mobile Phone',
            value: '-',
          },
        },
        {
          group_title: 'Invoicing Information',
          'Invoicing Contact': 'Invoicing Contact',
          field_orgz_inc_name: {
            label: 'Name',
            value: '-',
          },
          field_orgz_inc_title: {
            label: 'Title',
            value: '-',
          },
          field_orgz_inc_department: {
            label: 'Department',
            value: '-',
          },
          field_orgz_inc_email: {
            label: 'Email',
            value: '-',
          },
          field_orgz_inc_office_phone: {
            label: 'Office Phone',
            value: '-',
          },
          field_orgz_inc_extension: {
            label: 'Extension',
            value: '-',
          },
          field_orgz_inc_mobile_phone: {
            label: 'Mobile Phone',
            value: '-',
          },
          'Invoicing Mailing Address': 'Invoicing Mailing Address',
          field_orgz_inc_ma_street_line_1: {
            label: 'Street Line 1',
            value: '-',
          },
          field_orgz_inc_ma_street_line_2: {
            label: 'Street Line 2',
            value: '-',
          },
          field_orgz_inc_ma_town_city: {
            label: 'Town/City',
            value: '-',
          },
          field_orgz_inc_ma_state: {
            label: 'State',
            value: '-',
          },
          field_orgz_inc_ma_zip_code: {
            label: 'Zip Code',
            value: '-',
          },
        },
      ],
      organization_type: [
        {
          group_title: 'Partner Information',
          field_orgz_status: {
            label: 'Partner Status',
            value: 'Active',
          },
        },
        {
          group_title: 'General Sponsor Information',
          field_orgz_gen_sponser_status: {
            label: 'General Sponsor Status',
            value: 'Not Active',
          },
          field_orgz_sponsor_logo: {
            label: 'Logo',
            value: '-',
          },
          field_orgz_sponsor_logo_redirect: {
            label: 'Logo redirect URL',
            value: '-',
          },
        },
        {
          group_title: 'SelF Sponsor Information',
          field_orgz_self_sponser_status: {
            label: 'SelF Sponsor Status',
            value: 'Active',
          },
          field_orgz_self_ss_logo: {
            label: 'Logo',
            value: '-',
          },
          field_orgz_self_ss_logo_redirect: {
            label: 'Logo redirect URL',
            value: 'https://www.uhc.com/',
          },
        },
        {
          group_title: 'Service Provider Information',
          field_orgz_service_pro_status: {
            label: 'Service Provider Status',
            value: 'Active',
          },
          field_orgz_service_pro_dn: {
            label: 'Display Name',
            value: 'United Health Provider',
          },
          field_orgz_service_pro_des: {
            label: 'Description',
            value:
              'At UnitedHealthcare, our mission is to help people live healthier lives and make the health system work better for everyone.',
          },
          field_orgz_service_pro_phone: {
            label: 'Phone',
            value: '-',
          },
          field_orgz_service_pro_website: {
            label: 'Website',
            value: 'https://www.uhc.com/',
          },
          field_orgz_service_pro_web_label: {
            label: 'Website label',
            value: 'www.uhc.com',
          },
          field_orgz_service_pro_street_1: {
            label: 'Street Line 1',
            value: '-',
          },
          field_orgz_service_pro_street_2: {
            label: 'Street Line 2',
            value: '-',
          },
          field_orgz_service_pro_town_city: {
            label: 'Town/City',
            value: '-',
          },
          field_orgz_service_pro_state: {
            label: 'State',
            value: '-',
          },
          field_orgz_service_pro_zip_code: {
            label: 'Zip Code',
            value: '-',
          },
        },
      ],
    },
  },
  status: 'success',
};

export const createEditformFields = {
  data: [
    {
      section_info: {
        title: 'Basic Organization Information',
        machine_name: 'group_basic_orgz_info',
        display_label: 1,
        subsection: {
          group_orgz_border_div: {
            sub_title: 'Border Div',
            machine_name: 'group_orgz_border_div',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'title',
                title: 'Organization Title',
                required: true,
              },
              {
                type: 'textfield',
                machine_name: 'field_node_name',
                title: 'Organization Display Name',
                default_value: '',
                required: true,
                settings: {
                  character_limit: 100,
                  duplication_prevention: 'same',
                },
              },
            ],
          },
          group_orgz_border_div_1: {
            sub_title: 'Border Div',
            machine_name: 'group_orgz_border_div_1',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_tax_status',
                title: 'Tax Status',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'same',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_legal_status',
                title: 'Legal status',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_tax_id',
                title: 'Tax ID',
                default_value: '23-3434353',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '99-9999999',
                },
              },
            ],
          },
        },
      },
    },
    {
      section_info: {
        title: 'Contact Information',
        machine_name: 'group_orgz_contact_info_grp',
        display_label: 1,
        subsection: {
          group_orgz_pc_grp: {
            sub_title: 'Primary Contact',
            machine_name: 'group_orgz_pc_grp',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_pc_name',
                title: 'Name',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_pc_title',
                title: 'Title',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_pc_department',
                title: 'Department',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_pc_email',
                title: 'Email',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_pc_office_phone',
                title: 'Office Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_pc_extension',
                title: 'Extension',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_pc_mobile_phone',
                title: 'Mobile Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
            ],
          },
          group_orgz_sc_grp: {
            sub_title: 'Secondary Contact',
            machine_name: 'group_orgz_sc_grp',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_sc_name',
                title: 'Name',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_sc_title',
                title: 'Title',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_sc_department',
                title: 'Department',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_sc_email',
                title: 'Email',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_sc_office_phone',
                title: 'Office Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_sc_extension',
                title: 'Extension',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_sc_mobile_phone',
                title: 'Mobile Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
            ],
          },
        },
      },
    },
    {
      section_info: {
        title: 'Invoicing Information',
        machine_name: 'group_orgz_inc_info_grp',
        display_label: 1,
        subsection: {
          group_orgz_inc_grp: {
            sub_title: 'Invoicing Contact',
            machine_name: 'group_orgz_inc_grp',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_name',
                title: 'Name',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_title',
                title: 'Title',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_department',
                title: 'Department',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_email',
                title: 'Email',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_inc_office_phone',
                title: 'Office Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_extension',
                title: 'Extension',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_inc_mobile_phone',
                title: 'Mobile Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
            ],
          },
          group_orgz_inc_ma_grp: {
            sub_title: 'Invoicing Mailing Address',
            machine_name: 'group_orgz_inc_ma_grp',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_ma_street_line_1',
                title: 'Street Line 1',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_ma_street_line_2',
                title: 'Street Line 2',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_inc_ma_town_city',
                title: 'Town/City',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'select',
                machine_name: 'field_orgz_inc_ma_state',
                title: 'State',
                options: {
                  AK: 'AK',
                  AL: 'AL',
                  AR: 'AR',
                  AZ: 'AZ',
                  CA: 'CA',
                  CO: 'CO',
                  CT: 'CT',
                  DC: 'DC',
                  DE: 'DE',
                  FL: 'FL',
                  GA: 'GA',
                  HI: 'HI',
                  IA: 'IA',
                  ID: 'ID',
                  IL: 'IL',
                  IN: 'IN',
                  KS: 'KS',
                  KY: 'KY',
                  LA: 'LA',
                  MA: 'MA',
                  MD: 'MD',
                  ME: 'ME',
                  MI: 'MI',
                  MN: 'MN',
                  MO: 'MO',
                  MS: 'MS',
                  MT: 'MT',
                  NC: 'NC',
                  ND: 'ND',
                  NE: 'NE',
                  NH: 'NH',
                  NJ: 'NJ',
                  NM: 'NM',
                  NV: 'NV',
                  NY: 'NY',
                  OH: 'OH',
                  OK: 'OK',
                  OR: 'OR',
                  PA: 'PA',
                  RI: 'RI',
                  SC: 'SC',
                  SD: 'SD',
                  TN: 'TN',
                  TX: 'TX',
                  UT: 'UT',
                  VA: 'VA',
                  VT: 'VT',
                  WA: 'WA',
                  WI: 'WI',
                  WV: 'WV',
                  WY: 'WY',
                },
                default_value: '',
                required: false,
                settings: {
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_inc_ma_zip_code',
                title: 'Zip Code',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '99999',
                },
              },
            ],
          },
        },
      },
    },
    {
      section_types_info: {
        title: 'Partner Information',
        machine_name: 'group_orgz_partner_info_grp',
        display_label: 1,
        field_data: [
          {
            type: 'radio',
            machine_name: 'field_orgz_status',
            title: 'Partner Status',
            options: {
              0: 'Not Active',
              1: 'Active',
            },
            default_value: '0',
            required: true,
            settings: {
              allowed_values: {
                0: 'Not Active',
                1: 'Active',
              },
              allowed_values_function: '',
            },
          },
        ],
      },
    },
    {
      section_types_info: {
        title: 'General Sponsor Information',
        machine_name: 'group_orgz_org_ss_info_grp',
        display_label: 1,
        field_data: [
          {
            type: 'radio',
            machine_name: 'field_orgz_gen_sponser_status',
            title: 'General Sponsor Status',
            options: {
              0: 'Not Active',
              1: 'Active',
            },
            default_value: '0',
            required: false,
            settings: {
              allowed_values: {
                0: 'Not Active',
                1: 'Active',
              },
              allowed_values_function: '',
            },
          },
        ],
        subsection: {
          group_orgz_gen_ss_info_div: {
            sub_title: 'Border Div',
            machine_name: 'group_orgz_gen_ss_info_div',
            display_label: 0,
            field_data: [
              {
                type: 'file',
                machine_name: 'field_orgz_sponsor_logo',
                title: 'Logo',
                required: false,
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_sponsor_logo_redirect',
                title: 'Logo redirect URL',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
            ],
          },
          group_orgz_gen_ss_info_div_1: {
            sub_title: 'Border Div 1',
            machine_name: 'group_orgz_gen_ss_info_div_1',
            display_label: 0,
            field_data: [
              {
                type: 'textarea',
                machine_name: 'field_orgz_sponsor_description',
                title: 'Description',
                default_value: '',
                required: false,
                rows: '5',
              },
            ],
          },
        },
      },
    },
    {
      section_types_info: {
        title: 'SelF Sponsor Information',
        machine_name: 'group_orgz_self_ss_info_grp',
        display_label: 1,
        field_data: [
          {
            type: 'radio',
            machine_name: 'field_orgz_self_sponser_status',
            title: 'SelF Sponsor Status',
            options: {
              0: 'Not Active',
              1: 'Active',
            },
            default_value: '0',
            required: false,
            settings: {
              allowed_values: {
                0: 'Not Active',
                1: 'Active',
              },
              allowed_values_function: '',
            },
          },
          {
            type: 'file',
            machine_name: 'field_orgz_self_ss_logo',
            title: 'Logo',
            required: false,
          },
          {
            type: 'textfield',
            machine_name: 'field_orgz_self_ss_logo_redirect',
            title: 'Logo redirect URL',
            default_value: '',
            required: false,
            settings: {
              character_limit: 255,
              duplication_prevention: 'none',
            },
          },
        ],
      },
    },
    {
      section_types_info: {
        title: 'Service Provider Information',
        machine_name: 'group_orgz_service_pro_grp',
        display_label: 1,
        field_data: [
          {
            type: 'radio',
            machine_name: 'field_orgz_service_pro_status',
            title: 'Service Provider Status',
            options: {
              0: 'Not Active',
              1: 'Active',
            },
            default_value: '0',
            required: false,
            settings: {
              allowed_values: {
                0: 'Not Active',
                1: 'Active',
              },
              allowed_values_function: '',
            },
          },
        ],
        subsection: {
          group_orgz_service_pro_grp_div: {
            sub_title: 'Border Div',
            machine_name: 'group_orgz_service_pro_grp_div',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_dn',
                title: 'Display Name',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_des',
                title: 'Description',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_service_pro_phone',
                title: 'Phone',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '999-999-9999',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_website',
                title: 'Website',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_web_label',
                title: 'Website label',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
            ],
          },
          group_orgz_service_pro_grp_div_1: {
            sub_title: 'Border Div 1',
            machine_name: 'group_orgz_service_pro_grp_div_1',
            display_label: 0,
            field_data: [
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_street_1',
                title: 'Street Line 1',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_street_2',
                title: 'Street Line 2',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_orgz_service_pro_town_city',
                title: 'Town/City',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'select',
                machine_name: 'field_orgz_service_pro_state',
                title: 'State',
                options: {
                  AK: 'AK',
                  AL: 'AL',
                  AR: 'AR',
                  AZ: 'AZ',
                  CA: 'CA',
                  CO: 'CO',
                  CT: 'CT',
                  DC: 'DC',
                  DE: 'DE',
                  FL: 'FL',
                  GA: 'GA',
                  HI: 'HI',
                  IA: 'IA',
                  ID: 'ID',
                  IL: 'IL',
                  IN: 'IN',
                  KS: 'KS',
                  KY: 'KY',
                  LA: 'LA',
                  MA: 'MA',
                  MD: 'MD',
                  ME: 'ME',
                  MI: 'MI',
                  MN: 'MN',
                  MO: 'MO',
                  MS: 'MS',
                  MT: 'MT',
                  NC: 'NC',
                  ND: 'ND',
                  NE: 'NE',
                  NH: 'NH',
                  NJ: 'NJ',
                  NM: 'NM',
                  NV: 'NV',
                  NY: 'NY',
                  OH: 'OH',
                  OK: 'OK',
                  OR: 'OR',
                  PA: 'PA',
                  RI: 'RI',
                  SC: 'SC',
                  SD: 'SD',
                  TN: 'TN',
                  TX: 'TX',
                  UT: 'UT',
                  VA: 'VA',
                  VT: 'VT',
                  WA: 'WA',
                  WI: 'WI',
                  WV: 'WV',
                  WY: 'WY',
                },
                default_value: '',
                required: false,
                settings: {
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_orgz_service_pro_zip_code',
                title: 'Zip Code',
                default_value: '',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '99999',
                },
              },
              {
                type: 'number',
                machine_name: 'field_test_currency_ed',
                title: 'Test Currency ED',
                default_value: '',
                required: false,
                settings: {
                  size_of_textfield: '60',
                  character_limit: '10',
                  duplication_prevention: 'same',
                  decimal_points: '0',
                  comma_separated: '1',
                  currency_symbol: '$',
                  negative_entry: '1',
                  min_max_option: 'min_max',
                  min: '10',
                  max: '20',
                },
              },
              {
                type: 'date',
                machine_name: 'field_snn_date',
                title: 'SNNO Date',
                default_value: '2024-12-16T00:00:00Z',
                required: false,
                settings: {
                  duplication_prevention: 'same',
                  date_restrictions: 'curr_past',
                },
              },
              {
                type: 'email',
                machine_name: 'field_gnn_email',
                title: 'GHJ EMAIL',
                default_value: '',
                required: false,
                settings: {
                  size_of_textfield: '60',
                  character_limit: '255',
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'select',
                machine_name: 'field_us_abrr',
                title: 'US ABrr',
                options: {
                  AK: 'AK',
                  AL: 'AL',
                  AR: 'AR',
                  AZ: 'AZ',
                  CA: 'CA',
                  CO: 'CO',
                  CT: 'CT',
                  DC: 'DC',
                  DE: 'DE',
                  FL: 'FL',
                  GA: 'GA',
                  HI: 'HI',
                  IA: 'IA',
                  ID: 'ID',
                  IL: 'IL',
                  IN: 'IN',
                  KS: 'KS',
                  KY: 'KY',
                  LA: 'LA',
                  MA: 'MA',
                  MD: 'MD',
                  ME: 'ME',
                  MI: 'MI',
                  MN: 'MN',
                  MO: 'MO',
                  MS: 'MS',
                  MT: 'MT',
                  NC: 'NC',
                  ND: 'ND',
                  NE: 'NE',
                  NH: 'NH',
                  NJ: 'NJ',
                  NM: 'NM',
                  NV: 'NV',
                  NY: 'NY',
                  OH: 'OH',
                  OK: 'OK',
                  OR: 'OR',
                  PA: 'PA',
                  RI: 'RI',
                  SC: 'SC',
                  SD: 'SD',
                  TN: 'TN',
                  TX: 'TX',
                  UT: 'UT',
                  VA: 'VA',
                  VT: 'VT',
                  WA: 'WA',
                  WI: 'WI',
                  WV: 'WV',
                  WY: 'WY',
                },
                default_value: 'LA',
                required: false,
                settings: {
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'select',
                machine_name: 'field_us_state_full_name_1',
                title: 'US State Full Name 1',
                options: {
                  AK: 'Alabama',
                  AL: 'Alaska',
                  AR: 'Arizona',
                  AZ: 'Arkansas',
                  CA: 'California',
                  CO: 'Colorado',
                  CT: 'Connecticut',
                  DC: 'Delaware',
                  DE: 'District of Columbia',
                  FL: 'Florida',
                  GA: 'Georgia',
                  HI: 'Hawaii',
                  IA: 'Idaho',
                  ID: 'Illinois',
                  IL: 'Indiana',
                  IN: 'Iowa',
                  KS: 'Kansas',
                  KY: 'Kentucky',
                  LA: 'Louisiana',
                  MA: 'Maine',
                  MD: 'Maryland',
                  ME: 'Massachusetts',
                  MI: 'Michigan',
                  MN: 'Minnesota',
                  MO: 'Mississippi',
                  MS: 'Missouri',
                  MT: 'Montana',
                  NC: 'Nebraska',
                  ND: 'Nevada',
                  NE: 'New Hampshire',
                  NH: 'New Jersey',
                  NJ: 'New Mexico',
                  NM: 'New York',
                  NV: 'North Carolina',
                  NY: 'North Dakota',
                  OH: 'Ohio',
                  OK: 'Oklahoma',
                  OR: 'Oregon',
                  PA: 'Pennsylvania',
                  RI: 'Rhode Island',
                  SC: 'South Carolina',
                  SD: 'South Dakota',
                  TN: 'Tennessee',
                  TX: 'Texas',
                  UT: 'Utah',
                  VA: 'Vermont',
                  VT: 'Virginia',
                  WA: 'Washington',
                  WI: 'West Virginia',
                  WV: 'Wisconsin',
                  WY: 'Wyoming',
                },
                default_value: '',
                required: false,
                settings: {
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'select',
                machine_name: 'field_us_territory_1',
                title: 'US Territory 1',
                options: {
                  AK: 'AK',
                  AL: 'AL',
                  AR: 'AR',
                  AS: 'AS',
                  AZ: 'AZ',
                  CA: 'CA',
                  CO: 'CO',
                  CT: 'CT',
                  DC: 'DC',
                  DE: 'DE',
                  FL: 'FL',
                  GA: 'GA',
                  GU: 'GU',
                  HI: 'HI',
                  IA: 'IA',
                  ID: 'ID',
                  IL: 'IL',
                  IN: 'IN',
                  KS: 'KS',
                  KY: 'KY',
                  LA: 'LA',
                  MA: 'MA',
                  MD: 'MD',
                  ME: 'ME',
                  MI: 'MI',
                  MN: 'MN',
                  MO: 'MO',
                  MP: 'MP',
                  MS: 'MS',
                  MT: 'MT',
                  NC: 'NC',
                  ND: 'ND',
                  NE: 'NE',
                  NH: 'NH',
                  NJ: 'NJ',
                  NM: 'NM',
                  NV: 'NV',
                  NY: 'NY',
                  OH: 'OH',
                  OK: 'OK',
                  OR: 'OR',
                  PA: 'PA',
                  PR: 'PR',
                  RI: 'RI',
                  SC: 'SC',
                  SD: 'SD',
                  TN: 'TN',
                  TX: 'TX',
                  UT: 'UT',
                  VA: 'VA',
                  VI: 'VI',
                  VT: 'VT',
                  WA: 'WA',
                  WI: 'WI',
                  WV: 'WV',
                  WY: 'WY',
                },
                default_value: 'WA',
                required: false,
                settings: {
                  duplication_prevention: 'same',
                },
              },
              {
                type: 'select',
                machine_name: 'field_gender_kkl',
                title: 'Gender',
                options: {
                  male: 'Male',
                  female: 'Female',
                  other: 'Other',
                },
                default_value: 'male',
                required: false,
                settings: {
                  duplication_prevention: 'unique',
                },
              },
              {
                type: 'masked_input',
                machine_name: 'field_masked_input_tex',
                title: 'Masked Input TEX',
                default_value: '87878',
                required: false,
                settings: {
                  placeholder: '-',
                  mask_placeholder: '_',
                  mask: '_',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_site_name',
                title: 'Site',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 255,
                  duplication_prevention: 'none',
                },
              },
              {
                type: 'textfield',
                machine_name: 'field_kite_name',
                title: 'Kite',
                default_value: '2',
                required: false,
                settings: {
                  character_limit: 10,
                  duplication_prevention: 'same',
                },
              },
              {
                type: 'number',
                machine_name: 'field_prn_number_deci',
                title: 'PRN Number Deci',
                default_value: '',
                required: false,
                settings: {
                  character_limit: 10,
                  decimal_place: 2,
                  comma_separated: '1',
                  negative_entry: '1',
                  min: null,
                  max: null,
                  duplication_prevention: 'same',
                },
              },
              {
                type: 'select',
                machine_name: 'field_us_territory_full_nme',
                title: 'US Territory Full NME',
                options: {
                  AK: 'Alabama',
                  AL: 'Alaska',
                  AR: 'American Samoa',
                  AS: 'Arizona',
                  AZ: 'Arkansas',
                  CA: 'California',
                  CO: 'Colorado',
                  CT: 'Connecticut',
                  DC: 'Delaware',
                  DE: 'District of Columbia',
                  FL: 'Florida',
                  GA: 'Georgia',
                  GU: 'Guam',
                  HI: 'Hawaii',
                  IA: 'Idaho',
                  ID: 'Illinois',
                  IL: 'Indiana',
                  IN: 'Iowa',
                  KS: 'Kansas',
                  KY: 'Kentucky',
                  LA: 'Louisiana',
                  MA: 'Maine',
                  MD: 'Maryland',
                  ME: 'Massachusetts',
                  MI: 'Michigan',
                  MN: 'Minnesota',
                  MO: 'Mississippi',
                  MP: 'Missouri',
                  MS: 'Montana',
                  MT: 'Nebraska',
                  NC: 'Nevada',
                  ND: 'New Hampshire',
                  NE: 'New Jersey',
                  NH: 'New Mexico',
                  NJ: 'New York',
                  NM: 'North Carolina',
                  NV: 'North Dakota',
                  NY: 'Northern Mariana Islands',
                  OH: 'Ohio',
                  OK: 'Oklahoma',
                  OR: 'Oregon',
                  PA: 'Pennsylvania',
                  PR: 'Puerto Rico',
                  RI: 'Rhode Island',
                  SC: 'South Carolina',
                  SD: 'South Dakota',
                  TN: 'Tennessee',
                  TX: 'Texas',
                  UT: 'Utah',
                  VA: 'Vermont',
                  VI: 'Virginia',
                  VT: 'Virgin Islands',
                  WA: 'Washington',
                  WI: 'West Virginia',
                  WV: 'Wisconsin',
                  WY: 'Wyoming',
                },
                default_value: 'FL',
                required: false,
                settings: {
                  duplication_prevention: 'same',
                },
              },
            ],
          },
        },
      },
    },
  ],
  status: 'success',
};

export const navigationMenu = [
  {
    title: 'Home',
    route: '/home',
    icon: PeopleOutlineRoundedIcon,
  },
  {
    title: 'Customers',
    icon: 'GroupIcon',
    isCollapsible: false,
    subMenu: [
      {
        title: 'Manage',
        route: '/customers/manage',
        icon: PeopleOutlineRoundedIcon,
      },
      {
        title: 'Create',
        route: '/customers/create',
        icon: PeopleOutlineRoundedIcon,
      },
      {
        title: 'Import',
        route: '/customers/import',
        icon: PeopleOutlineRoundedIcon,
      },
    ],
  },
  {
    title: 'Selfs',
    icon: 'GroupIcon',
    isCollapsible: false,
    subMenu: [
      {
        title: 'Manage',
        route: '/customers/manage',
        icon: PeopleOutlineRoundedIcon,
      },
      {
        title: 'Create',
        route: '/customers/create',
        icon: PeopleOutlineRoundedIcon,
      },
      {
        title: 'Import',
        route: '/customers/import',
        icon: PeopleOutlineRoundedIcon,
      },
    ],
  },
];

export const editOrgData = {
  data: {
    organizations: {
      info_type: [
        {
          group_title: 'Basic Organization Information',
          title: {
            label: 'Organization Name',
            value: 'New Org 1 test',
          },
          field_node_name: {
            label: 'Organization Display Name',
            value: 'New ORGZ AQ',
          },
          field_orgz_tax_status: {
            label: 'Tax Status',
            value: 'CNASD',
          },
          field_orgz_legal_status: {
            label: 'Legal status',
            value: 'NCN',
          },
          field_orgz_tax_id: {
            label: 'Tax ID',
            value: '23-23425651',
          },
        },
        {
          group_title: 'Contact Information',
          'Primary Contact': 'Primary Contact',
          field_orgz_pc_name: {
            label: 'Name',
            value: 'AFS DS',
          },
          field_orgz_pc_title: {
            label: 'Title',
            value: 'EII',
          },
          field_orgz_pc_department: {
            label: 'Department',
            value: 'KCJE',
          },
          field_orgz_pc_email: {
            label: 'Email',
            value: 'ads@asd.com',
          },
          field_orgz_pc_office_phone: {
            label: 'Office Phone',
            value: '000-949-9459',
          },
          field_orgz_pc_extension: {
            label: 'Extension',
            value: '23',
          },
          field_orgz_pc_mobile_phone: {
            label: 'Mobile Phone',
            value: '456-929-9669',
          },
          'Secondary Contact': 'Secondary Contact',
          field_orgz_sc_name: {
            label: 'Name',
            value: 'ORO',
          },
          field_orgz_sc_title: {
            label: 'Title',
            value: 'IJHJ',
          },
          field_orgz_sc_department: {
            label: 'Department',
            value: 'KKCKD',
          },
          field_orgz_sc_email: {
            label: 'Email',
            value: 'KKCK',
          },
          field_orgz_sc_office_phone: {
            label: 'Office Phone',
            value: '964-239-9333',
          },
          field_orgz_sc_extension: {
            label: 'Extension',
            value: '39',
          },
          field_orgz_sc_mobile_phone: {
            label: 'Mobile Phone',
            value: '239-009-0399',
          },
        },
        {
          group_title: 'Invoicing Information',
          'Invoicing Contact': 'Invoicing Contact',
          field_orgz_inc_name: {
            label: 'Name',
            value: 'KKCN',
          },
          field_orgz_inc_title: {
            label: 'Title',
            value: 'KNNC',
          },
          field_orgz_inc_department: {
            label: 'Department',
            value: 'OEOI',
          },
          field_orgz_inc_email: {
            label: 'Email',
            value: 'aff@asd.com',
          },
          field_orgz_inc_office_phone: {
            label: 'Office Phone',
            value: '999-999-9999',
          },
          field_orgz_inc_extension: {
            label: 'Extension',
            value: '43',
          },
          field_orgz_inc_mobile_phone: {
            label: 'Mobile Phone',
            value: '999-999-9999',
          },
          'Invoicing Mailing Address': 'Invoicing Mailing Address',
          field_orgz_inc_ma_street_line_1: {
            label: 'Street Line 1',
            value: 'UJD Lane 1',
          },
          field_orgz_inc_ma_street_line_2: {
            label: 'Street Line 2',
            value: 'UJD Lane 2',
          },
          field_orgz_inc_ma_town_city: {
            label: 'Town/City',
            value: 'UJD City',
          },
          field_orgz_inc_ma_state: {
            label: 'State',
            value: 'MS',
          },
          field_orgz_inc_ma_zip_code: {
            label: 'Zip Code',
            value: '99999',
          },
        },
      ],
      organization_type: [
        {
          group_title: 'Partner Information',
          field_orgz_status: {
            label: 'Partner Status',
            value: 'Active',
          },
        },
        {
          group_title: 'General Sponsor Information',
          field_orgz_gen_sponser_status: {
            label: 'General Sponsor Status',
            value: 'Active',
          },
          field_orgz_sponsor_logo: {
            label: 'Logo',
            value: '',
          },
          field_orgz_sponsor_logo_redirect: {
            label: 'Logo redirect URL',
            value: '',
          },
        },
        {
          group_title: 'SelF Sponsor Information',
          field_orgz_self_sponser_status: {
            label: 'SelF Sponsor Status',
            value: 'Active',
          },
          field_orgz_self_ss_logo: {
            label: 'Logo',
            value: '',
          },
          field_orgz_self_ss_logo_redirect: {
            label: 'Logo redirect URL',
            value: '',
          },
        },
        {
          group_title: 'Service Provider Information',
          field_orgz_service_pro_status: {
            label: 'Service Provider Status',
            value: 'Active',
          },
          field_orgz_service_pro_dn: {
            label: 'Display Name',
            value: 'MNC',
          },
          field_orgz_service_pro_des: {
            label: 'Description',
            value: 'KDK',
          },
          field_orgz_service_pro_phone: {
            label: 'Phone',
            value: '999-999-9999',
          },
          field_orgz_service_pro_website: {
            label: 'Website',
            value: 'www.google.com',
          },
          field_orgz_service_pro_web_label: {
            label: 'Website label',
            value: 'KSKW',
          },
          field_orgz_service_pro_street_1: {
            label: 'Street Line 1',
            value: 'OELD Lane 1',
          },
          field_orgz_service_pro_street_2: {
            label: 'Street Line 2',
            value: 'OELD Lane 2',
          },
          field_orgz_service_pro_town_city: {
            label: 'Town/City',
            value: 'OELD City',
          },
          field_orgz_service_pro_state: {
            label: 'State',
            value: 'DC',
          },
          field_orgz_service_pro_zip_code: {
            label: 'Zip Code',
            value: '34544',
          },
        },
      ],
    },
  },
  status: 'success',
};

export const customerListing = {
  data: {
    columns: {
      edited_by: "Edited By",
      role: "Role",
      date_time: "Date/Time",
      field: "Field",
      from: "From",
      to: "To"
    },
    default_columns: {
      edited_by: "Edited By",
      field: "Field",
      from: "From",
      to: "To"
    },
    customers: [
      {
        edited_by: "John Does",
        role: "Administrator",
        date_time: "10/08/2024 09:27 AM",
        field: "Organization Name",
        from: "United Health",
        to: "23-4255546",

      },
      {
        edited_by: "John Does",
        role: "Supervisor",
        date_time: "10/08/2024 09:27 AM",
        field: "Organization Tax ID",
        from: "Mr. Anthony Carrigan",
        to: "United Health Care",

      },
      {
        edited_by: "Ganesh Lad",
        role: "Supervisor",
        date_time: "10/08/2024 09:27 AM",
        field: "Organization Tax Status",
        from: "UnitedHealth",
        to: "UHC",

      },
    ],
    kpi: [
      {
        id: 1,
        customerName: 'Timothy Mueller',
        status: 'Customer',
      },
      {
        id: 2,
        customerName: ['Ganesh Lad', 'Specialist'],
        status: 'Created By',
      },
      {
        id: 3,
        customerName: 'Sarah Connor',
        status: 'Customer',
      },
    ]
  },
  status: "success"
};



export const importGriddata = {
  "data": {
    "fields": {
      "field_types": [
        {
          "section_types_info": {
            "title": "",
            "machine_name": "group_basic_customer_info",
            "display_label": 1,
            "subsection": {
              "group_border_div": {
                "sub_title": "Border div",
                "machine_name": "group_border_div",
                "display_label": 1,
                "field_data": [

                  // {
                  //   "type": 'masked_input',
                  //   "machine_name": 'field_orgz_tax_id',
                  //   "title": 'Tax ID',
                  //   "default_value": '23-3434353',
                  //   "required": false,
                  //   "settings": {
                  //     "placeholder": '-',
                  //     "mask_placeholder": '_',
                  //     "mask": '99-9999999',
                  //   },
                  // },

                  {
                    "type": 'masked_input',
                    "machine_name": 'field_ssn',
                    "title": 'Enter Customer SSN',
                    "default_value": '',
                    "required": true,
                    "settings": {
                      "placeholder": '___-__-____',
                      "mask_placeholder": 'true',
                      // "mask": '99-9999999',
                    },
                  },

                ]
              },

            }
          }
        },

      ],
    },
  }
};


export const changeHOHData = {
  "data": {
    "fields": {
      "field_types": [
        {
          "section_types_info": {
            "title": "Basic Information",
            "machine_name": "group_basic_customer_info",
            "display_label": 1,
            "subsection": {
              "group_border_div": {
                "sub_title": "Border div",
                "machine_name": "group_border_div",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_customer_unique_id",
                    "title": "ID of New HOH",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_relationship_to_hoh",
                    "title": "Relationship",
                    "options": [],
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_name_of_hoh",
                    "title": "Name Of HOH",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                ]
              },

            }
          }
        },


      ],
      "list_fields": {
        "field_relationship_to_hoh": {
          "type": "select",
          "machine_name": "field_relationship_to_hoh",
          "title": "Relationship To HOH",
          "options": {
            "Aunt": "Aunt",
            "Brother": "Brother",
            "Brother-in-law": "Brother-in-law",
            "Cousin": "Cousin",
            "Daughter": "Daughter",
            "Daughter-in-law": "Daughter-in-law",
            "Father": "Father",
            "Father-in-law": "Father-in-law",
            "Friend (not family member)": "Friend (not family member)",
            "Granddaughter": "Granddaughter",
            "Grandfather": "Grandfather",
            "Grandmother": "Grandmother",
            "Grandson": "Grandson",
            "Great granddaughter": "Great granddaughter",
            "Great grandfather": "Great grandfather",
            "Great grandmother": "Great grandmother",
            "Great grandson": "Great grandson",
            "Half-brother": "Half-brother",
            "Half-sister": "Half-sister",
            "Husband": "Husband",
            "Mother": "Mother",
            "Mother-in-law": "Mother-in-law",
            "Nephew": "Nephew",
            "Niece": "Niece",
            "Partner 17 (not married)": "Partner 17 (not married)",
            "Sister": "Sister",
            "Sister-in-law": "Sister-in-law",
            "Son": "Son",
            "Son-in-law": "Son-in-law",
            "Stepbrother": "Stepbrother",
            "Stepdaughter": "Stepdaughter",
            "Stepfather": "Stepfather",
            "Stepmother": "Stepmother",
            "Stepsister": "Stepsister",
            "Stepson": "Stepson",
            "Uncle": "Uncle",
            "Wife": "Wife",
            "Spouse": "Spouse",
            "Co-head": "Co-head",
            "Foster child/foster adult": "Foster child/foster adult",
            "Other youth under 18": "Other youth under 18",
            "Full-time student 18+": "Full-time student 18+",
            "Live-in aide": "Live-in aide",
            "Other adult": "Other adult"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_gender": {
          "type": "select",
          "machine_name": "field_gender",
          "title": "Gender",
          "options": {
            "male": "Male",
            "female": "Female",
            "unsubsidized_employment": "Unsubsidized employment",
            "subsidized_private_sector_employment": "Subsidized private sector employment",
            "subsidized_public_sector_employment": "Subsidized public sector employment",
            "work_experience": "Work experience",
            "job_search_and_job_readiness_assistance": "Job search and job readiness assistance"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_new_residential_state_shor": {
          "type": "select",
          "machine_name": "field_new_residential_state_shor",
          "title": "New residential state short",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_new_mailing_state_short": {
          "type": "select",
          "machine_name": "field_new_mailing_state_short",
          "title": "New mailing state short",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_cedex_state": {
          "type": "select",
          "machine_name": "field_cedex_state",
          "title": "CEDEX state",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_state_short_test_two": {
          "type": "select",
          "machine_name": "field_state_short_test_two",
          "title": "State short test two",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_state_long_test_two": {
          "type": "select",
          "machine_name": "field_state_long_test_two",
          "title": "State long test two",
          "options": {
            "Alabama": "Alabama",
            "Alaska": "Alaska",
            "Arizona": "Arizona",
            "Arkansas": "Arkansas",
            "California": "California",
            "Colorado": "Colorado",
            "Connecticut": "Connecticut",
            "Delaware": "Delaware",
            "District of Columbia": "District of Columbia",
            "Florida": "Florida",
            "Georgia": "Georgia",
            "Hawaii": "Hawaii",
            "Idaho": "Idaho",
            "Illinois": "Illinois",
            "Indiana": "Indiana",
            "Iowa": "Iowa",
            "Kansas": "Kansas",
            "Kentucky": "Kentucky",
            "Louisiana": "Louisiana",
            "Maine": "Maine",
            "Maryland": "Maryland",
            "Massachusetts": "Massachusetts",
            "Michigan": "Michigan",
            "Minnesota": "Minnesota",
            "Mississippi": "Mississippi",
            "Missouri": "Missouri",
            "Montana": "Montana",
            "Nebraska": "Nebraska",
            "Nevada": "Nevada",
            "New Hampshire": "New Hampshire",
            "New Jersey": "New Jersey",
            "New Mexico": "New Mexico",
            "New York": "New York",
            "North Carolina": "North Carolina",
            "North Dakota": "North Dakota",
            "Ohio": "Ohio",
            "Oklahoma": "Oklahoma",
            "Oregon": "Oregon",
            "Pennsylvania": "Pennsylvania",
            "Rhode Island": "Rhode Island",
            "South Carolina": "South Carolina",
            "South Dakota": "South Dakota",
            "Tennessee": "Tennessee",
            "Texas": "Texas",
            "Utah": "Utah",
            "Vermont": "Vermont",
            "Virginia": "Virginia",
            "Washington": "Washington",
            "West Virginia": "West Virginia",
            "Wisconsin": "Wisconsin",
            "Wyoming": "Wyoming"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_hm_drop_down": {
          "type": "select",
          "machine_name": "field_hm_drop_down",
          "title": "HM drop-down",
          "options": {
            "yes": "Yes",
            "no": "No"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_drop_down_test_two": {
          "type": "select",
          "machine_name": "field_drop_down_test_two",
          "title": "Drop-down test two",
          "options": {
            "yes": "Yes",
            "no": "No",
            "decline": "Decline",
            "na": "NA"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_hm_status_v2": {
          "type": "select",
          "machine_name": "field_hm_status_v2",
          "title": "Status",
          "options": {
            "in_household": "In household",
            "not_in_household": "Not in household"
          },
          "default_value": "in_household",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        }
      },
      "hoh_name": "John Does",
      "hoh_id": "774"
    },
    "status": "success"
  }
};


export const hmGriddata = {
  "data": {
    "fields": {
      "field_types": [
        {
          "section_types_info": {
            "title": "Basic Information",
            "machine_name": "group_basic_customer_info",
            "display_label": 1,
            "subsection": {
              "group_border_div": {
                "sub_title": "Border div",
                "machine_name": "group_border_div",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_customer_unique_id",
                    "title": "HM Customer ID",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_first_namee",
                    "title": "HM First Name",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_last_namee",
                    "title": "HM Last Name",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_name_of_hoh",
                    "title": "Name Of HOH",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_relationship_to_hoh",
                    "title": "Relationship To HOH",
                    "options": [],
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  }
                ]
              },
              "group_border_div_1": {
                "sub_title": "Border div",
                "machine_name": "group_border_div_1",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_ssn",
                    "title": "SSN",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "unique"
                    }
                  },
                  null,
                  {
                    "type": "textfield",
                    "machine_name": "field_mobile_number",
                    "title": "Mobile Number",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_gender",
                    "title": "Gender",
                    "options": {
                      "male": "Male",
                      "female": "Female",
                      "unsubsidized_employment": "Unsubsidized employment",
                      "subsidized_private_sector_employment": "Subsidized private sector employment",
                      "subsidized_public_sector_employment": "Subsidized public sector employment",
                      "work_experience": "Work experience",
                      "job_search_and_job_readiness_assistance": "Job search and job readiness assistance"
                    },
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_email",
                    "title": "HM Email",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "date",
                    "machine_name": "field_dob2",
                    "title": "DOB",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": null,
                      "date_restrictions": null
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "section_types_info": {
            "title": "Address",
            "machine_name": "group_address",
            "display_label": 1,
            "subsection": {
              "group_border_div_2": {
                "sub_title": "Residential Address",
                "machine_name": "group_border_div_2",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_street",
                    "title": "Street",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_city1",
                    "title": "City1",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_new_residential_state_shor",
                    "title": "New residential state short",
                    "options": {
                      "AK": "AK",
                      "AL": "AL",
                      "AR": "AR",
                      "AZ": "AZ",
                      "CA": "CA",
                      "CO": "CO",
                      "CT": "CT",
                      "DC": "DC",
                      "DE": "DE",
                      "FL": "FL",
                      "GA": "GA",
                      "HI": "HI",
                      "IA": "IA",
                      "ID": "ID",
                      "IL": "IL",
                      "IN": "IN",
                      "KS": "KS",
                      "KY": "KY",
                      "LA": "LA",
                      "MA": "MA",
                      "MD": "MD",
                      "ME": "ME",
                      "MI": "MI",
                      "MN": "MN",
                      "MO": "MO",
                      "MS": "MS",
                      "MT": "MT",
                      "NC": "NC",
                      "ND": "ND",
                      "NE": "NE",
                      "NH": "NH",
                      "NJ": "NJ",
                      "NM": "NM",
                      "NV": "NV",
                      "NY": "NY",
                      "OH": "OH",
                      "OK": "OK",
                      "OR": "OR",
                      "PA": "PA",
                      "RI": "RI",
                      "SC": "SC",
                      "SD": "SD",
                      "TN": "TN",
                      "TX": "TX",
                      "UT": "UT",
                      "VA": "VA",
                      "VT": "VT",
                      "WA": "WA",
                      "WI": "WI",
                      "WV": "WV",
                      "WY": "WY"
                    },
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_zip_code",
                    "title": "ZIP Code",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  }
                ]
              },
              "group_border_div_3": {
                "sub_title": "Mailing Address",
                "machine_name": "group_border_div_3",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_city_mailing",
                    "title": "City mailing",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_new_mailing_state_short",
                    "title": "New mailing state short",
                    "options": {
                      "AK": "AK",
                      "AL": "AL",
                      "AR": "AR",
                      "AZ": "AZ",
                      "CA": "CA",
                      "CO": "CO",
                      "CT": "CT",
                      "DC": "DC",
                      "DE": "DE",
                      "FL": "FL",
                      "GA": "GA",
                      "HI": "HI",
                      "IA": "IA",
                      "ID": "ID",
                      "IL": "IL",
                      "IN": "IN",
                      "KS": "KS",
                      "KY": "KY",
                      "LA": "LA",
                      "MA": "MA",
                      "MD": "MD",
                      "ME": "ME",
                      "MI": "MI",
                      "MN": "MN",
                      "MO": "MO",
                      "MS": "MS",
                      "MT": "MT",
                      "NC": "NC",
                      "ND": "ND",
                      "NE": "NE",
                      "NH": "NH",
                      "NJ": "NJ",
                      "NM": "NM",
                      "NV": "NV",
                      "NY": "NY",
                      "OH": "OH",
                      "OK": "OK",
                      "OR": "OR",
                      "PA": "PA",
                      "RI": "RI",
                      "SC": "SC",
                      "SD": "SD",
                      "TN": "TN",
                      "TX": "TX",
                      "UT": "UT",
                      "VA": "VA",
                      "VT": "VT",
                      "WA": "WA",
                      "WI": "WI",
                      "WV": "WV",
                      "WY": "WY"
                    },
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "section_types_info": {
            "title": "Program Information",
            "machine_name": "group_san_exmpt_status",
            "display_label": 1,
            "subsection": {
              "group_border_div_4": {
                "sub_title": "Border div",
                "machine_name": "group_border_div_4",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_mixed_mask",
                    "title": "Mixed mask",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "date",
                    "machine_name": "field_cedex_date",
                    "title": "CEDEX date",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": null,
                      "date_restrictions": null
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_cedex_state",
                    "title": "CEDEX state",
                    "options": {
                      "AK": "AK",
                      "AL": "AL",
                      "AR": "AR",
                      "AZ": "AZ",
                      "CA": "CA",
                      "CO": "CO",
                      "CT": "CT",
                      "DC": "DC",
                      "DE": "DE",
                      "FL": "FL",
                      "GA": "GA",
                      "HI": "HI",
                      "IA": "IA",
                      "ID": "ID",
                      "IL": "IL",
                      "IN": "IN",
                      "KS": "KS",
                      "KY": "KY",
                      "LA": "LA",
                      "MA": "MA",
                      "MD": "MD",
                      "ME": "ME",
                      "MI": "MI",
                      "MN": "MN",
                      "MO": "MO",
                      "MS": "MS",
                      "MT": "MT",
                      "NC": "NC",
                      "ND": "ND",
                      "NE": "NE",
                      "NH": "NH",
                      "NJ": "NJ",
                      "NM": "NM",
                      "NV": "NV",
                      "NY": "NY",
                      "OH": "OH",
                      "OK": "OK",
                      "OR": "OR",
                      "PA": "PA",
                      "RI": "RI",
                      "SC": "SC",
                      "SD": "SD",
                      "TN": "TN",
                      "TX": "TX",
                      "UT": "UT",
                      "VA": "VA",
                      "VT": "VT",
                      "WA": "WA",
                      "WI": "WI",
                      "WV": "WV",
                      "WY": "WY"
                    },
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_state_short_test_two",
                    "title": "State short test two",
                    "options": {
                      "AK": "AK",
                      "AL": "AL",
                      "AR": "AR",
                      "AZ": "AZ",
                      "CA": "CA",
                      "CO": "CO",
                      "CT": "CT",
                      "DC": "DC",
                      "DE": "DE",
                      "FL": "FL",
                      "GA": "GA",
                      "HI": "HI",
                      "IA": "IA",
                      "ID": "ID",
                      "IL": "IL",
                      "IN": "IN",
                      "KS": "KS",
                      "KY": "KY",
                      "LA": "LA",
                      "MA": "MA",
                      "MD": "MD",
                      "ME": "ME",
                      "MI": "MI",
                      "MN": "MN",
                      "MO": "MO",
                      "MS": "MS",
                      "MT": "MT",
                      "NC": "NC",
                      "ND": "ND",
                      "NE": "NE",
                      "NH": "NH",
                      "NJ": "NJ",
                      "NM": "NM",
                      "NV": "NV",
                      "NY": "NY",
                      "OH": "OH",
                      "OK": "OK",
                      "OR": "OR",
                      "PA": "PA",
                      "RI": "RI",
                      "SC": "SC",
                      "SD": "SD",
                      "TN": "TN",
                      "TX": "TX",
                      "UT": "UT",
                      "VA": "VA",
                      "VT": "VT",
                      "WA": "WA",
                      "WI": "WI",
                      "WV": "WV",
                      "WY": "WY"
                    },
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_state_long_test_two",
                    "title": "State long test two",
                    "options": {
                      "Alabama": "Alabama",
                      "Alaska": "Alaska",
                      "Arizona": "Arizona",
                      "Arkansas": "Arkansas",
                      "California": "California",
                      "Colorado": "Colorado",
                      "Connecticut": "Connecticut",
                      "Delaware": "Delaware",
                      "District of Columbia": "District of Columbia",
                      "Florida": "Florida",
                      "Georgia": "Georgia",
                      "Hawaii": "Hawaii",
                      "Idaho": "Idaho",
                      "Illinois": "Illinois",
                      "Indiana": "Indiana",
                      "Iowa": "Iowa",
                      "Kansas": "Kansas",
                      "Kentucky": "Kentucky",
                      "Louisiana": "Louisiana",
                      "Maine": "Maine",
                      "Maryland": "Maryland",
                      "Massachusetts": "Massachusetts",
                      "Michigan": "Michigan",
                      "Minnesota": "Minnesota",
                      "Mississippi": "Mississippi",
                      "Missouri": "Missouri",
                      "Montana": "Montana",
                      "Nebraska": "Nebraska",
                      "Nevada": "Nevada",
                      "New Hampshire": "New Hampshire",
                      "New Jersey": "New Jersey",
                      "New Mexico": "New Mexico",
                      "New York": "New York",
                      "North Carolina": "North Carolina",
                      "North Dakota": "North Dakota",
                      "Ohio": "Ohio",
                      "Oklahoma": "Oklahoma",
                      "Oregon": "Oregon",
                      "Pennsylvania": "Pennsylvania",
                      "Rhode Island": "Rhode Island",
                      "South Carolina": "South Carolina",
                      "South Dakota": "South Dakota",
                      "Tennessee": "Tennessee",
                      "Texas": "Texas",
                      "Utah": "Utah",
                      "Vermont": "Vermont",
                      "Virginia": "Virginia",
                      "Washington": "Washington",
                      "West Virginia": "West Virginia",
                      "Wisconsin": "Wisconsin",
                      "Wyoming": "Wyoming"
                    },
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  }
                ]
              },
              "group_border_div_5": {
                "sub_title": "Border div",
                "machine_name": "group_border_div_5",
                "display_label": 1,
                "field_data": [
                  {
                    "type": "textfield",
                    "machine_name": "field_tanf_benefits",
                    "title": "TANF Benefits",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_snap_benefits",
                    "title": "SNAP Benefits",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_hm_drop_down",
                    "title": "HM drop-down",
                    "options": {
                      "yes": "Yes",
                      "no": "No"
                    },
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_hm_fft",
                    "title": "HM FFT",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_hm_number",
                    "title": "HM Number",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "date",
                    "machine_name": "field_hm_date",
                    "title": "HM Date",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "duplication_prevention": null,
                      "date_restrictions": null
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_hm_currency",
                    "title": "HM Currency",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_hm_email",
                    "title": "HM Email",
                    "default_value": "",
                    "required": true,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_email_test_two",
                    "title": "Email test two",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "select",
                    "machine_name": "field_drop_down_test_two",
                    "title": "Drop-down test two",
                    "options": {
                      "yes": "Yes",
                      "no": "No",
                      "decline": "Decline",
                      "na": "NA"
                    },
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_fft_test_two",
                    "title": "FFT test two",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "date",
                    "machine_name": "field_date_test_two",
                    "title": "Date test two",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "duplication_prevention": null,
                      "date_restrictions": null
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_currency_test_two",
                    "title": "Currency test two",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  },
                  {
                    "type": "textfield",
                    "machine_name": "field_masked_test_two",
                    "title": "Masked test two",
                    "default_value": "",
                    "required": false,
                    "settings": {
                      "character_limit": 255,
                      "duplication_prevention": "none"
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "section_info": {
            "title": null,
            "machine_name": null,
            "display_label": 1,
            "field_data": [
              null,
              {
                "type": "file",
                "machine_name": "field_profile_image",
                "title": "Profile Image",
                "required": false
              },
              {
                "type": "select",
                "machine_name": "field_hm_status_v2",
                "title": "Status",
                "options": {
                  "in_household": "In household",
                  "not_in_household": "Not in household"
                },
                "default_value": "in_household",
                "required": false,
                "settings": {
                  "duplication_prevention": "none"
                }
              },
              {
                "type": "textfield",
                "machine_name": "field_hm_status",
                "title": "Status",
                "default_value": "",
                "required": false,
                "settings": {
                  "character_limit": 255,
                  "duplication_prevention": "none"
                }
              }
            ]
          }
        }
      ],
      "list_fields": {
        "field_relationship_to_hoh": {
          "type": "select",
          "machine_name": "field_relationship_to_hoh",
          "title": "Relationship To HOH",
          "options": {
            "Aunt": "Aunt",
            "Brother": "Brother",
            "Brother-in-law": "Brother-in-law",
            "Cousin": "Cousin",
            "Daughter": "Daughter",
            "Daughter-in-law": "Daughter-in-law",
            "Father": "Father",
            "Father-in-law": "Father-in-law",
            "Friend (not family member)": "Friend (not family member)",
            "Granddaughter": "Granddaughter",
            "Grandfather": "Grandfather",
            "Grandmother": "Grandmother",
            "Grandson": "Grandson",
            "Great granddaughter": "Great granddaughter",
            "Great grandfather": "Great grandfather",
            "Great grandmother": "Great grandmother",
            "Great grandson": "Great grandson",
            "Half-brother": "Half-brother",
            "Half-sister": "Half-sister",
            "Husband": "Husband",
            "Mother": "Mother",
            "Mother-in-law": "Mother-in-law",
            "Nephew": "Nephew",
            "Niece": "Niece",
            "Partner 17 (not married)": "Partner 17 (not married)",
            "Sister": "Sister",
            "Sister-in-law": "Sister-in-law",
            "Son": "Son",
            "Son-in-law": "Son-in-law",
            "Stepbrother": "Stepbrother",
            "Stepdaughter": "Stepdaughter",
            "Stepfather": "Stepfather",
            "Stepmother": "Stepmother",
            "Stepsister": "Stepsister",
            "Stepson": "Stepson",
            "Uncle": "Uncle",
            "Wife": "Wife",
            "Spouse": "Spouse",
            "Co-head": "Co-head",
            "Foster child/foster adult": "Foster child/foster adult",
            "Other youth under 18": "Other youth under 18",
            "Full-time student 18+": "Full-time student 18+",
            "Live-in aide": "Live-in aide",
            "Other adult": "Other adult"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_gender": {
          "type": "select",
          "machine_name": "field_gender",
          "title": "Gender",
          "options": {
            "male": "Male",
            "female": "Female",
            "unsubsidized_employment": "Unsubsidized employment",
            "subsidized_private_sector_employment": "Subsidized private sector employment",
            "subsidized_public_sector_employment": "Subsidized public sector employment",
            "work_experience": "Work experience",
            "job_search_and_job_readiness_assistance": "Job search and job readiness assistance"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_new_residential_state_shor": {
          "type": "select",
          "machine_name": "field_new_residential_state_shor",
          "title": "New residential state short",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_new_mailing_state_short": {
          "type": "select",
          "machine_name": "field_new_mailing_state_short",
          "title": "New mailing state short",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_cedex_state": {
          "type": "select",
          "machine_name": "field_cedex_state",
          "title": "CEDEX state",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_state_short_test_two": {
          "type": "select",
          "machine_name": "field_state_short_test_two",
          "title": "State short test two",
          "options": {
            "AK": "AK",
            "AL": "AL",
            "AR": "AR",
            "AZ": "AZ",
            "CA": "CA",
            "CO": "CO",
            "CT": "CT",
            "DC": "DC",
            "DE": "DE",
            "FL": "FL",
            "GA": "GA",
            "HI": "HI",
            "IA": "IA",
            "ID": "ID",
            "IL": "IL",
            "IN": "IN",
            "KS": "KS",
            "KY": "KY",
            "LA": "LA",
            "MA": "MA",
            "MD": "MD",
            "ME": "ME",
            "MI": "MI",
            "MN": "MN",
            "MO": "MO",
            "MS": "MS",
            "MT": "MT",
            "NC": "NC",
            "ND": "ND",
            "NE": "NE",
            "NH": "NH",
            "NJ": "NJ",
            "NM": "NM",
            "NV": "NV",
            "NY": "NY",
            "OH": "OH",
            "OK": "OK",
            "OR": "OR",
            "PA": "PA",
            "RI": "RI",
            "SC": "SC",
            "SD": "SD",
            "TN": "TN",
            "TX": "TX",
            "UT": "UT",
            "VA": "VA",
            "VT": "VT",
            "WA": "WA",
            "WI": "WI",
            "WV": "WV",
            "WY": "WY"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_state_long_test_two": {
          "type": "select",
          "machine_name": "field_state_long_test_two",
          "title": "State long test two",
          "options": {
            "Alabama": "Alabama",
            "Alaska": "Alaska",
            "Arizona": "Arizona",
            "Arkansas": "Arkansas",
            "California": "California",
            "Colorado": "Colorado",
            "Connecticut": "Connecticut",
            "Delaware": "Delaware",
            "District of Columbia": "District of Columbia",
            "Florida": "Florida",
            "Georgia": "Georgia",
            "Hawaii": "Hawaii",
            "Idaho": "Idaho",
            "Illinois": "Illinois",
            "Indiana": "Indiana",
            "Iowa": "Iowa",
            "Kansas": "Kansas",
            "Kentucky": "Kentucky",
            "Louisiana": "Louisiana",
            "Maine": "Maine",
            "Maryland": "Maryland",
            "Massachusetts": "Massachusetts",
            "Michigan": "Michigan",
            "Minnesota": "Minnesota",
            "Mississippi": "Mississippi",
            "Missouri": "Missouri",
            "Montana": "Montana",
            "Nebraska": "Nebraska",
            "Nevada": "Nevada",
            "New Hampshire": "New Hampshire",
            "New Jersey": "New Jersey",
            "New Mexico": "New Mexico",
            "New York": "New York",
            "North Carolina": "North Carolina",
            "North Dakota": "North Dakota",
            "Ohio": "Ohio",
            "Oklahoma": "Oklahoma",
            "Oregon": "Oregon",
            "Pennsylvania": "Pennsylvania",
            "Rhode Island": "Rhode Island",
            "South Carolina": "South Carolina",
            "South Dakota": "South Dakota",
            "Tennessee": "Tennessee",
            "Texas": "Texas",
            "Utah": "Utah",
            "Vermont": "Vermont",
            "Virginia": "Virginia",
            "Washington": "Washington",
            "West Virginia": "West Virginia",
            "Wisconsin": "Wisconsin",
            "Wyoming": "Wyoming"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_hm_drop_down": {
          "type": "select",
          "machine_name": "field_hm_drop_down",
          "title": "HM drop-down",
          "options": {
            "yes": "Yes",
            "no": "No"
          },
          "default_value": "",
          "required": true,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_drop_down_test_two": {
          "type": "select",
          "machine_name": "field_drop_down_test_two",
          "title": "Drop-down test two",
          "options": {
            "yes": "Yes",
            "no": "No",
            "decline": "Decline",
            "na": "NA"
          },
          "default_value": "",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        },
        "field_hm_status_v2": {
          "type": "select",
          "machine_name": "field_hm_status_v2",
          "title": "Status",
          "options": {
            "in_household": "In household",
            "not_in_household": "Not in household"
          },
          "default_value": "in_household",
          "required": false,
          "settings": {
            "duplication_prevention": "none"
          }
        }
      },
      "hoh_name": "John Does",
      "hoh_id": "774"
    },
    "status": "success"
  }
};


export const hmGridEditData = {
  data:
  {
    "profile_id": "779",
    "field_customer_unique_id": "1924",
    "type": "household_member_profile",
    "field_hoh_profile": "779",
    "field_address_line_1_mailing": null,
    "field_address_line_2_": null,
    "field_address_line_2_mailing": null,
    "field_city1": "Debuques",
    "field_city_mailing": "3445 Nice St",
    "field_currency_test_two": "34",
    "field_date_test_two": "2022-11-03",
    "field_dob2": "2025-09-01",
    "field_drop_down_test_two": "yes",
    "field_email": "test@gamil.com",
    "field_email_test_1": null,
    "field_email_test_two": "knope@p.c",
    "field_fft_test_two": "33",
    "field_first_namee": "Leslie",
    "field_gender": "female",
    "field_last_namee": "Knope",
    "field_masked_test_two": "azz",
    "field_mixed_mask": "TTaazz",
    "field_mobile_number": "+1 (323) 232-3235",
    "field_new_mailing_state_short": "FL",
    "field_new_residential_state_shor": "AK",
    "field_snap_benefits": "3",
    "field_state_long_test_two": "Georgia",
    "field_state_short_test_two": "FL",
    "field_street": "18 Franklin St N",
    "field_tanf_benefits": "22.0",
    "field_zip_code": "20022",
    "field_zip_mailing": null,
    "field_relationship_to_hoh": "Brother",
    "field_hm_status_v2": "inm",
  }





}
export const tabList = [
  { key: 'profile', label: 'Profile' },
  { key: 'household', label: 'Household' },
  { key: 'insight', label: 'Insight' },
  { key: 'appointment', label: 'Appointment' },
  { key: 'interaction', label: 'Interaction' },
  { key: 'email', label: 'Email' },
];
export const requestEditData = {
  cust_history: {
    customer: {
      title: 'Customer',
      value: ' ',
    },
    imported_by: {
      title: 'Imported By',
      value: "Aar'on Dorm Customer",
    },
    imported_on: {
      title: 'Imported On',
      value: '2023-06-28T04:00:00Z',
    },
  },
  title: ' Request Edits To Customer Information',

  from: {
    first_name: "Aniket",
    interaction: "Mumbai",
    outcome: "Any",
    plan: "-",
    self: "Yes",
    timesheet: "May"
  },
  field: {
    options: {
      first_name: "First Name",
      interaction: "Interaction",
      outcome: "Outcome",
      plan: "Plan",
      self: "Self-administered",
      timesheet: "Timesheet"
    }


  }
};














export const ActivityData = {
  "data": {
    "node_history": {
      "node_title": {
        "title": "Organization",
        "value": "Dummy Data"
      },
      "created_by": {
        "title": "Created By",
        "value": {
          "name": "Xyz Abc",
          "role": "Administrator"
        }
      },
      "created_on": {
        "title": "Created On",
        "value": "2023-11-25T05:00:00Z"
      }
    },
    "rows": [
      {
        "id": "21",
        "edited_by": "jay culter",
        "role_by": "Supervisor",
        "account_display_name": "Drac DHS 1",
        "date": "03\/26\/2025 00:32 AM",
        "field": "Service Provider Description",
        "from": "We can all help prevent suicide. The 988 Lifeline provides 24\/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals in the United States.",
        "to": "We can all help prevent suicide. The 988 Lifeline provides 24\/7 free and confidential support for people in distress prevention and crisis resources for you or your loved ones and best practices for professionals in the United States."
      },
      {
        "id": "20",
        "edited_by": "jay culter",
        "role_by": "Supervisor",
        "account_display_name": "Drac DHS 1",
        "date": "03\/25\/2025 08:46 AM",
        "field": "Service Provider Description",
        "from": "We can all help prevent suicide. The 988 Lifeline provides 24\/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals in the United States.",
        "to": "We can all help prevent suicide. The 988 Lifeline provides 24\/7 free and confidential support for people in distress prevention and crisis resources for you or your loved ones and best practices for professionals in the United States."
      },
      {
        "id": "19",
        "edited_by": "Ganesh Lad",
        "role_by": "Administrator",
        "account_display_name": "",
        "date": "03\/24\/2025 05:08 AM",
        "field": "Service Provider Description",
        "from": "We can all help prevent suicide. The 988 Lifeline provides 24\/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals in the United States.",
        "to": "We can all help prevent suicide. The 988 Lifeline provides 24\/7 free and confidential support for people in distress prevention and crisis resources for you or your loved ones and best practices for professionals in the United States."
      },
      {
        "id": "18",
        "edited_by": "Ganesh Lad",
        "role_by": "Administrator",
        "account_display_name": "",
        "date": "03\/24\/2025 05:08 AM",
        "field": "Service Provider Status",
        "from": "",
        "to": "Active"
      }
    ]
  },
  "status": "success"
}


export const ChangeHoHDatas = {
  "data": {
    "node_history": {
      "created_by": {
        "title": "Household Member",
        "value": {
          "name": "Timothy Mueller",
        }
      },
      "hoh": {
        "title": "Current HOH",
        "value": {
          "id": "ID: 1910",
          "name": "Anya Ortega",
          "relationship": "Brother"
        }
      },
    },

    "form_fields": [
      {
        "type": "textfield",
        "machine_name": "field_hoh_profile",
        "title": "Customer ID",
        "default_value": "",
        "required": true,
        "settings": {
          "character_limit": 255,
          "duplication_prevention": "none"
        }
      },
      {
        "type": "select",
        "machine_name": "field_relationship_to_hoh",
        "title": "Relationship",
        "options": {
          "Aunt": "Aunt",
          "Brother": "Brother",
          "Brother-in-law": "Brother-in-law",
          "Cousin": "Cousin",
          "Daughter": "Daughter",
          "Daughter-in-law": "Daughter-in-law",
          "Father": "Father",
          "Father-in-law": "Father-in-law",
          "Friend (not family member)": "Friend (not family member)",
          "Granddaughter": "Granddaughter",
          "Grandfather": "Grandfather",
          "Grandmother": "Grandmother",
          "Grandson": "Grandson",
          "Great granddaughter": "Great granddaughter",
          "Great grandfather": "Great grandfather",
          "Great grandmother": "Great grandmother",
          "Great grandson": "Great grandson",
          "Half-brother": "Half-brother",
          "Half-sister": "Half-sister",
          "Husband": "Husband",
        },
        "default_value": "Brother",
        "required": false,
        "settings": {
          "duplication_prevention": "none"
        }
      },
      {
        "type": "static_text",
        "machine_name": "field_created_by",
        "title": "Created By",
        "default_value": "Frank Miller"
      }
    ]
  },
  "status": "success"
}

// changeHOHData

export const dummyResponseHOH = {
  "messages": {
    "field_hoh_profile": "Customer ID is required.",
    "field_relationship_to_hoh": "Relationship is required.",
    "field_name_of_hoh": "Name Of HOH is required.",
  },
  "status": "error"
}