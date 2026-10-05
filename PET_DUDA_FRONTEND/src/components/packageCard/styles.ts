import styled, { css } from "styled-components";

interface StatusBadgeProps {
  $status: string;
}

interface CopyMessageButtonProps {
  $visible?: boolean;
}

const ButtonStyle = css`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 6px 12px;
  border: none;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;

  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);

  display: flex;
  flex-direction: column;
  gap: 12px;

  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PackageId = styled.h3`
  margin: 0;
  color: #0f172a;
`;

export const Badge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 6px 12px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;

  background: ${({ $status }) =>
    $status === "success" ? "#DCFCE7" : "#FEF3C7"};

  color: ${({ $status }) => ($status === "success" ? "#15803D" : "#D97706")};
`;

export const CopyMessageButton = styled.button<CopyMessageButtonProps>`
  ${ButtonStyle}

  display: ${({ $visible = true }) => ($visible ? "inline-flex" : "none")};

  background: #dcfce7;
  color: #15803d;
`;

export const PaymentButton = styled.button<StatusBadgeProps>`
  ${ButtonStyle}

  background: ${({ $status }) =>
    $status === "success" ? "#DCFCE7" : "#FEF3C7"};

  color: ${({ $status }) => ($status === "success" ? "#15803D" : "#D97706")};
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #64748b;
`;

export const Value = styled.span`
  color: #0f172a;
  font-weight: 500;
`;

export const ServicesContainer = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
`;

export const ServicesTitle = styled.h4`
  margin: 0 0 12px;
  color: #0f172a;
`;

export const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px 0;
`;

export const ServiceInfo = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`;
