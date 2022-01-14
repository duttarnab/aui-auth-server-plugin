import React from 'react'
import { Container, Row, Col } from '../../../../app/components'
import GluuFormDetailRow from '../../../../app/routes/Apps/Gluu/GluuFormDetailRow'
import { SCOPE } from '../../../../app/utils/ApiResources'
import { useTranslation } from 'react-i18next'

function ScopeDetailPage({ row }) {
  const { t } = useTranslation()
  function getBadgeTheme(status) {
    if (status) {
      return 'primary'
    } else {
      return 'info'
    }
  }
  return (
    <React.Fragment>
      <Container style={{ backgroundColor: '#F5F5F5' }}>
        <Row>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.inum"
              value={row.inum}
              doc_category={SCOPE}
              doc_entry="inum"
            />
          </Col>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.id"
              value={row.id}
              doc_category={SCOPE}
              doc_entry="id"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.description"
              value={row.description}
              doc_category={SCOPE}
              doc_entry="description"
            />
          </Col>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.displayname"
              value={row.displayName}
              doc_category={SCOPE}
              doc_entry="displayName"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.scope_type"
              value={row.scopeType}
              doc_category={SCOPE}
              doc_entry="scopeType"
              isBadge
            />
          </Col>
          <Col sm={6}>
            <GluuFormDetailRow
              label="fields.default_scope"
              isBadge
              badgeColor={getBadgeTheme(row.defaultScope)}
              value={row.defaultScope ? t('options.yes') : t('options.no')}
              doc_category={SCOPE}
              doc_entry="defaultScope"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>{t('fields.attributes')}:</Col>
          <Col sm={9}>
            {Object.keys(row.attributes).map((item, key) => (
              <GluuFormDetailRow
                key={key}
                label={item}
                isBadge={true}
                value={String(row.attributes[item])}
                doc_category={SCOPE}
                doc_entry="attributes"
              />
            ))}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default ScopeDetailPage
