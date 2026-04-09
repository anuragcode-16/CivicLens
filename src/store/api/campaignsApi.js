import { baseApi } from '@/store/api/baseApi';

const CAMPAIGNS_PATH = '/api/campaigns';
const CAMPAIGN_JOINS_PATH = '/api/campaign-joins';

function toNumberOrUndefined(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeCampaignPayload(payload = {}) {
  const createdBy = toNumberOrUndefined(payload.createdBy);
  const participantCount = toNumberOrUndefined(payload.participantCount);

  return {
    ...payload,
    ...(createdBy !== undefined ? { createdBy } : {}),
    ...(participantCount !== undefined ? { participantCount } : {}),
  };
}

function normalizeCampaignJoinPayload(payload = {}) {
  const campaignId = toNumberOrUndefined(payload.campaignId);
  const userId = toNumberOrUndefined(payload.userId);

  return {
    ...payload,
    ...(campaignId !== undefined ? { campaignId } : {}),
    ...(userId !== undefined ? { userId } : {}),
  };
}

function extractCollection(result, fallbackKeys = []) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;

  for (const key of fallbackKeys) {
    if (Array.isArray(result?.[key])) {
      return result[key];
    }
  }

  return [];
}

function listTags(type, result, fallbackKeys = []) {
  const items = extractCollection(result, fallbackKeys);

  return [
    { type, id: 'LIST' },
    ...items
      .filter((item) => item?.id !== undefined && item?.id !== null)
      .map((item) => ({ type, id: item.id })),
  ];
}

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => ({
        url: CAMPAIGNS_PATH,
        method: 'GET',
      }),
      providesTags: (result) => listTags('Campaign', result, ['campaigns', 'items']),
    }),

    getCampaignById: builder.query({
      query: (id) => ({
        url: `${CAMPAIGNS_PATH}/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Campaign', id }],
    }),

    createCampaign: builder.mutation({
      query: (payload) => ({
        url: CAMPAIGNS_PATH,
        method: 'POST',
        body: normalizeCampaignPayload(payload),
      }),
      invalidatesTags: [{ type: 'Campaign', id: 'LIST' }],
    }),

    updateCampaign: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `${CAMPAIGNS_PATH}/${id}`,
        method: 'PUT',
        body: normalizeCampaignPayload(payload),
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Campaign', id },
        { type: 'Campaign', id: 'LIST' },
      ],
    }),

    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `${CAMPAIGNS_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Campaign', id },
        { type: 'Campaign', id: 'LIST' },
        { type: 'CampaignJoin', id: 'LIST' },
      ],
    }),

    getCampaignJoins: builder.query({
      query: () => ({
        url: CAMPAIGN_JOINS_PATH,
        method: 'GET',
      }),
      providesTags: (result) => listTags('CampaignJoin', result, ['campaignJoins', 'items']),
    }),

    getCampaignJoinById: builder.query({
      query: (id) => ({
        url: `${CAMPAIGN_JOINS_PATH}/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'CampaignJoin', id }],
    }),

    createCampaignJoin: builder.mutation({
      query: (payload) => ({
        url: CAMPAIGN_JOINS_PATH,
        method: 'POST',
        body: normalizeCampaignJoinPayload(payload),
      }),
      invalidatesTags: (_result, _error, payload = {}) => [
        { type: 'CampaignJoin', id: 'LIST' },
        { type: 'Campaign', id: 'LIST' },
        ...(payload?.campaignId !== undefined && payload?.campaignId !== null
          ? [{ type: 'Campaign', id: payload.campaignId }]
          : []),
      ],
    }),

    updateCampaignJoin: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `${CAMPAIGN_JOINS_PATH}/${id}`,
        method: 'PUT',
        body: normalizeCampaignJoinPayload(payload),
      }),
      invalidatesTags: (_result, _error, { id, campaignId } = {}) => [
        { type: 'CampaignJoin', id },
        { type: 'CampaignJoin', id: 'LIST' },
        { type: 'Campaign', id: 'LIST' },
        ...(campaignId !== undefined && campaignId !== null
          ? [{ type: 'Campaign', id: campaignId }]
          : []),
      ],
    }),

    deleteCampaignJoin: builder.mutation({
      query: (id) => ({
        url: `${CAMPAIGN_JOINS_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'CampaignJoin', id },
        { type: 'CampaignJoin', id: 'LIST' },
        { type: 'Campaign', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
  useGetCampaignJoinsQuery,
  useGetCampaignJoinByIdQuery,
  useCreateCampaignJoinMutation,
  useUpdateCampaignJoinMutation,
  useDeleteCampaignJoinMutation,
} = campaignsApi;
