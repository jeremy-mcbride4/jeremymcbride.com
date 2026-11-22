// Content for the industry landing pages (/construction/, /solar/, /commercial-property/).
// Each page's <title> and description for search engines live in its own index.html.
// `projectIds` refer to project ids in src/components/Portfolio.jsx.
// `service` preselects the matching option in the quote form.

export const industries = [
  {
    slug: 'construction',
    path: '/construction/',
    name: 'Construction',
    cardTitle: 'Construction & Development',
    cardBody: 'Scheduled progress flights, LiDAR and volumes, and site maps your whole team can use.',
    headline: 'Construction progress you can see from the office.',
    intro:
      'Scheduled drone flights that document your site on a regular cadence: progress maps, stockpile volumes, LiDAR topography, and stakeholder-ready imagery. Fewer site walks, fewer disputes, faster owner updates.',
    badges: ['Progress Flights', 'LiDAR', 'Volumes', 'Orthomosaics', '3D Models'],
    problems: [
      {
        title: 'Owner & lender updates',
        body: 'Consistent aerial snapshots from repeatable flight paths, so every report compares like with like.',
      },
      {
        title: 'Earthwork & stockpile volumes',
        body: 'Cut/fill and stockpile measurements from LiDAR or photogrammetry point clouds, without stopping work on the ground.',
      },
      {
        title: 'Topography under vegetation',
        body: 'LiDAR captures ground surface through tree cover for pre-construction planning and drainage design.',
      },
      {
        title: 'Disputes & documentation',
        body: 'A dated visual record of site conditions, installed work, and staging, ready when a question comes up.',
      },
    ],
    deliverables: [
      'Georeferenced orthomosaics (GeoTIFF)',
      'LiDAR & photogrammetry point clouds (LAS/LAZ)',
      'Stockpile & cut/fill volume reports',
      'Progress photo & video sets',
      '3D models and 360° site panoramas',
      'Processed in DroneDeploy, Pix4D, or Metashape, with exports for your GIS and CAD tools',
    ],
    projectIds: ['construction-progress', 'remington'],
    service: 'Construction Progress',
  },
  {
    slug: 'solar',
    path: '/solar/',
    name: 'Solar & Energy',
    cardTitle: 'Solar & Energy',
    cardBody: 'Thermal inspections that find failing panels and hot spots across the whole array.',
    headline: 'Find failing panels before they cost you production.',
    intro:
      'Radiometric thermal and high-resolution RGB capture of solar arrays and rooftops. Hot spots, failed strings, and damaged modules located on a georeferenced map, so field crews go straight to the problem.',
    badges: ['Thermal', 'RGB Orthomosaics', 'Anomaly Mapping', 'Commissioning'],
    problems: [
      {
        title: 'Whole-array coverage',
        body: 'Inspect every module in a single visit instead of sampling by hand, from small rooftops to utility-scale sites.',
      },
      {
        title: 'Located anomalies',
        body: 'Thermal and RGB maps are aligned, so each hot spot can be traced to a specific row and module.',
      },
      {
        title: 'Warranty & commissioning',
        body: 'Documented baseline at commissioning and evidence for warranty claims when modules underperform.',
      },
      {
        title: 'Roof & building envelope',
        body: 'Thermal imaging also reveals moisture and insulation issues on the roofs that host the array.',
      },
    ],
    deliverables: [
      'Thermal orthomosaic',
      'RGB orthomosaic (GeoTIFF)',
      'Anomaly locations on a site map',
      'Close-up thermal & visual imagery',
    ],
    projectIds: ['meadowbrook'],
    service: 'Thermal / Solar Inspection',
  },
  {
    slug: 'commercial-property',
    path: '/commercial-property/',
    name: 'Commercial Property',
    cardTitle: 'Commercial Property',
    cardBody: 'Roof inspections, site maps, and 3D models for owners, managers, and insurers.',
    headline: 'See your whole property without climbing a ladder.',
    intro:
      'Roof inspections, high-resolution site maps, and navigable 3D models for property managers, owners, insurers, and brokers. Safe, fast, and documented, whether you have one building or a portfolio.',
    badges: ['Roof Inspections', 'Site Maps', '3D Models', 'Thermal', 'Marketing Aerials'],
    problems: [
      {
        title: 'Roof condition',
        body: 'Close-range imagery of every roof section for maintenance planning, claims, and underwriting, with no roof access required.',
      },
      {
        title: 'Site & asset records',
        body: 'Measurable orthomosaic maps of parking, paving, and grounds for planning and capital projects.',
      },
      {
        title: 'Remote walkthroughs',
        body: 'Navigable 3D models let stakeholders inspect a facility from any angle without traveling to it.',
      },
      {
        title: 'Leasing & marketing',
        body: 'Polished aerial photo and video that show tenants and buyers the site and its surroundings.',
      },
    ],
    deliverables: [
      'Roof inspection image sets',
      'Orthomosaic site maps (GeoTIFF)',
      '3D models (OBJ / PLY / web viewer)',
      'Thermal imagery on request',
      'Marketing photo & 4K video',
    ],
    projectIds: ['shopping-center', 'sams-club'],
    service: 'Roof / Property Inspection',
  },
]

export const findIndustry = (slug) => industries.find((i) => i.slug === slug)
