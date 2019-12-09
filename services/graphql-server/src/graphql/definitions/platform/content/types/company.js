const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

extend type Mutation {
  updateContentCompany(input: ContentCompanyMutationInput!): ContentCompany @requiresAuth
}

type ContentCompany implements Content & PrimaryCategory & Contactable & Addressable & SocialLinkable & Inquirable & OrganizationContactable @applyInterfaceFields {
  # fields directly on platform.model::Content\Company
  companyType: String @projection
  parentCompany(input: ContentCompanyParentCompanyInput = {}): ContentCompany @projection @refOne(loader: "platformContent" criteria: "contentCompany")
  brandsCarried(input: ContentCompanyBrandsCarriedInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content" criteria: "contentCompany")
  statesServed: [String]! @projection @arrayValue
  companyCompetitors(input: ContentCompanyCompanyCompetitorsInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content", criteria: "contentCompany")

  numberOfEmployees: String @projection
  trainingInformation: String @projection
  yearsInOperation: String @projection
  salesRegion: String @projection
  servicesProvided: String @projection
  salesChannels: String @projection
  productSummary: String @projection
  serviceInformation: String @projection
  warrantyInformation: String @projection

  youtube: ContentCompanyYoutube! @projection
  youtubeVideos(input: ContentCompanyYoutubeVideosInput = {}): YoutubePlaylistConnection! @projection(needs: ["youtube"])

  # fields directly on platform.model::Content\Company from mutations
  featuredCategories(input: ContentCompanyFeaturedCategoriesInput = {}): TaxonomyConnection! @projection(localField: "mutations.Website.featuredCategories") @refMany(model: "platform.Taxonomy", localField: "mutations.Website.featuredCategories", criteria: "taxonomyCategory")
}

type ContentCompanyYoutube {
  username: String
  channelId: String
  playlistId: String
  videos: [String!]
  url: String
}

type ContentCompanyConnection {
  totalCount: Int!
  edges: [ContentCompanyEdge]!
  pageInfo: PageInfo!
}

type ContentCompanyEdge {
  node: ContentCompany!
  cursor: String!
}

input ContentCompanyQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentCompanyMutationInput {
  id: Int!
  name: String
  address1: String
  address2: String
  city: String
  state: String
  zip: String
  country: String
  phone: String
  tollfree: String
  fax: String
  website: String
  type: String
  email: String
  body: String
  socialLinks: [ContentCompanySocialLinkInput!]
  teaser: String
  numberOfEmployees: String
  trainingInformation: String
  yearsInOperation: String
  salesRegion: String
  servicesProvided: String
  salesChannels: String
  productSummary: String
  serviceInformation: String
  warrantyInformation: String
}

input ContentCompanySocialLinkInput {
  provider: String!
  url: String!
}

input ContentCompanyCompanyCompetitorsInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyBrandsCarriedInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyFeaturedCategoriesInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyParentCompanyInput {
  status: ModelStatus = active
}

input ContentCompanySortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

input ContentCompanyYoutubeVideosInput {
  pagination: PaginationInput = {}
}

`;
