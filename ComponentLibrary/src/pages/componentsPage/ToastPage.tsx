import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import Container from "../../shared/templates/container/Container";
import { useToast } from "../../shared/ui/toast";
import { Button } from "../../shared/ui/button/Button";

const ToastPage = () => {
  const { notify, dismiss } = useToast();

  return (
    <section id="toast" className="section toast-section">
      <h2 className="section-heading">Toast</h2>
      <h4 className="section-desc">
        Toast component for displaying notifiactions, messages, etc.
      </h4>
      <Container
        title="Toast"
        desc="Displays brief, auto-expiring messages to inform users of actions or updates."
      >
        <Container.content>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              variant="secondary"
              onClick={() =>
                notify({
                  title: "Saved",
                  description: "Your changes were saved.",
                  type: "success",
                })
              }
            >
              Show success
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                notify({
                  title: "Info",
                  description: "Here is some information.",
                  type: "info",
                })
              }
            >
              Show info
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                notify({
                  title: "Warning",
                  description: "Heads up!",
                  type: "warning",
                })
              }
            >
              Show warning
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                const id = notify({
                  title: "Persistent",
                  description: "Will stay until dismissed",
                  duration: 0,
                });
                // auto-dismiss after 6s as a demo
                setTimeout(() => dismiss(id), 6000);
              }}
            >
              Show persistent
            </Button>
          </div>
        </Container.content>
        <Container.code>
          <CodeBlock
            code={`
const { notify } = useToast();

  <Button
    variant="secondary"
    onClick={() =>
      notify({
        title: "Saved",
        description: "Your changes were saved.",
        type: "success",
      })
    }
  >
    Show success
  </Button>
`}
          />
        </Container.code>
      </Container>
    </section>
  );
};

export default ToastPage;
