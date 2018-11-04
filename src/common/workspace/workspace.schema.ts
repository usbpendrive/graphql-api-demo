import Workspace from './workspace.model';

export const workspaceTypeDefs = `
  type Workspace {
    id: ID!
    name: String!
    Rating: Int
  }
  
  input WorkspaceInput {
    name: String
    rating: Int
  }
  
  input WorkspaceFilterInput {
    limit: Int
  }
  
  extend type Query {
    workspaces(filter: WorkspaceFilterInput): [Workspace]
    workspace(id: String!): Workspace
  }
  
  extend type Mutation {
    addWorkspace(input: WorkspaceInput!): Workspace
  }
`;

export const workspaceResolvers: any = {
  Query: {
    async workspaces(_, { filter }) {
      const workspaces: any[] = await Workspace.find({}, null, filter);
      return workspaces.map(workspace => workspace.toGraph());
    },
    async workspace(_, { id }) {
      const workspace: any = await Workspace.findById(id);
      return workspace.toGraph();
    },
  },
  Mutation: {
    async addWorkspace(_, { input }) {
      const workspace: any = await Workspace.create(input);
      return workspace.toGraph();
    },
  },
};