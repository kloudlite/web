import gql from 'graphql-tag';
import { IExecutor } from '~/root/lib/server/helpers/execute-query-with-context';
import { NN } from '~/root/lib/types/common';
import {
  ConsoleCreateVpnDeviceMutation,
  ConsoleCreateVpnDeviceMutationVariables,
  ConsoleDeleteVpnDeviceMutation,
  ConsoleDeleteVpnDeviceMutationVariables,
  ConsoleGetVpnDeviceQuery,
  ConsoleGetVpnDeviceQueryVariables,
  ConsoleListVpnDevicesQuery,
  ConsoleListVpnDevicesQueryVariables,
  ConsoleUpdateVpnDeviceMutation,
  ConsoleUpdateVpnDeviceMutationVariables,
} from '~/root/src/generated/gql/server';

export type IDevices = NN<ConsoleListVpnDevicesQuery['infra_listVPNDevices']>;

export const vpnQueries = (executor: IExecutor) => ({
  createVpnDevice: executor(
    gql`
      mutation Infra_createVPNDevice(
        $clusterName: String!
        $vpnDevice: VPNDeviceIn!
      ) {
        infra_createVPNDevice(
          clusterName: $clusterName
          vpnDevice: $vpnDevice
        ) {
          id
        }
      }
    `,
    {
      transformer: (data: ConsoleCreateVpnDeviceMutation) =>
        data.infra_createVPNDevice,
      vars(_: ConsoleCreateVpnDeviceMutationVariables) { },
    }
  ),

  updateVpnDevice: executor(
    gql`
      mutation Infra_updateVPNDevice(
        $clusterName: String!
        $vpnDevice: VPNDeviceIn!
      ) {
        infra_updateVPNDevice(
          clusterName: $clusterName
          vpnDevice: $vpnDevice
        ) {
          id
        }
      }
    `,
    {
      transformer: (v: ConsoleUpdateVpnDeviceMutation) => {
        return v.infra_updateVPNDevice;
      },
      vars(_: ConsoleUpdateVpnDeviceMutationVariables) { },
    }
  ),
  listVpnDevices: executor(
    gql`
      query Infra_listVPNDevices(
        $clusterName: String
        $search: SearchVPNDevices
        $pq: CursorPaginationIn
      ) {
        infra_listVPNDevices(
          clusterName: $clusterName
          search: $search
          pq: $pq
        ) {
          edges {
            cursor
            node {
              clusterName
              createdBy {
                userEmail
                userId
                userName
              }
              creationTime
              displayName
              lastUpdatedBy {
                userEmail
                userId
                userName
              }
              markedForDeletion
              metadata {
                annotations
                creationTimestamp
                deletionTimestamp
                generation
                labels
                name
                namespace
              }
              spec {
                ports {
                  port
                  targetPort
                }
              }
              status {
                checks
                isReady
                lastReadyGeneration
                lastReconcileTime
                message {
                  RawMessage
                }
                resources {
                  apiVersion
                  kind
                  name
                  namespace
                }
              }
              syncStatus {
                action
                error
                lastSyncedAt
                recordVersion
                state
                syncScheduledAt
              }
              updateTime
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          totalCount
        }
      }
    `,
    {
      transformer(data: ConsoleListVpnDevicesQuery) {
        return data.infra_listVPNDevices;
      },
      vars(_: ConsoleListVpnDevicesQueryVariables) { },
    }
  ),
  getVpnDevice: executor(
    gql`
      query Infra_getVPNDevice($clusterName: String!, $name: String!) {
        infra_getVPNDevice(clusterName: $clusterName, name: $name) {
          clusterName
          createdBy {
            userEmail
            userId
            userName
          }
          creationTime
          displayName
          lastUpdatedBy {
            userEmail
            userId
            userName
          }
          markedForDeletion
          metadata {
            annotations
            creationTimestamp
            deletionTimestamp
            generation
            labels
            name
            namespace
          }
          spec {
            ports {
              port
              targetPort
            }
          }
          status {
            checks
            isReady
            lastReadyGeneration
            lastReconcileTime
            message {
              RawMessage
            }
            resources {
              apiVersion
              kind
              name
              namespace
            }
          }
          syncStatus {
            action
            error
            lastSyncedAt
            recordVersion
            state
            syncScheduledAt
          }
          updateTime
          wireguardConfig {
            value
            encoding
          }
        }
      }
    `,
    {
      transformer(data: ConsoleGetVpnDeviceQuery) {
        return data.infra_getVPNDevice;
      },
      vars(_: ConsoleGetVpnDeviceQueryVariables) { },
    }
  ),
  deleteVpnDevice: executor(
    gql`
      mutation Infra_deleteVPNDevice(
        $clusterName: String!
        $deviceName: String!
      ) {
        infra_deleteVPNDevice(
          clusterName: $clusterName
          deviceName: $deviceName
        )
      }
    `,
    {
      transformer(data: ConsoleDeleteVpnDeviceMutation) {
        return data.infra_deleteVPNDevice;
      },
      vars(_: ConsoleDeleteVpnDeviceMutationVariables) { },
    }
  ),
});
