import styled from "styled-components";
import { mixins } from "./mixins";
import { colors } from "./colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 44px;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 640px) {
    padding: 44px 24px;
  }

  & > header {
    align-self: flex-start;
    height: 43px;
    margin-left: 10%;
    width: calc(100% - 20%);
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    & > section {
      flex: 1;
      min-width: 0;
    }
    & h2 {
      color: ${colors.gray500};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    & > div {
      display: flex;
      gap: 12px;
    }
    @media screen and (max-width: 640px) {
      margin-left: 0;
      width: 100%;
    }
  }
  & > h2 {
    height: 43px;
    margin-left: 10%;
    align-self: flex-start;
    color: ${colors.gray500};
    flex: 0 0 auto;

    @media screen and (max-width: 640px) {
      margin-left: 0;
    }
  }
  & > div {
    width: 80%;
    background-color: ${colors.bg300};
    border: ${mixins.border2};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 67px);
    
    @media screen and (max-width: 640px) {
      width: 100%;
    }
  }
`;

export const TableContainer = styled.div`
  margin: 0 24px 24px;
  border: ${mixins.border2};
  border-radius: 8px;
  overflow: auto;
  height: calc(100% - 90px);
  scrollbar-gutter: stable both-edges;
  box-shadow: ${mixins.shadow100};
  & > table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 14px;
    td {
      padding: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      & > p {
        padding: 4px 12px;
        width: max-content;
        border-radius: 12px;
        &.Nuevo {
          color: ${colors.yellow};
          background-color: ${colors.yellowBG};
        }
        &.Firmado {
          color: ${colors.green};
          background-color: ${colors.greenBG};
        }
        &.Declinado {
          color: ${colors.red};
          background-color: ${colors.redBG};
        }
      }
    }
    th {
      text-align: start;
      padding: 24px;
      white-space: nowrap;
      &.big {
        width: 200px;
      }
      &.medium {
        width: 140px;
      }
      &.extrabig {
        width: 240px;
      }
    }
    tr {
      border-bottom: ${mixins.border2};
    }
    & > thead {
      tr {
        background-color: ${colors.bg200};
      }
    }
    & > tbody {
      tr:nth-child(even) {
        background-color: ${colors.bg200};
      }
      & .buttons {
        display: flex;
        gap: 16px;
      }
    }
  }
`;