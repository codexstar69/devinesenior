import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/common/Layout";
import Home from "@/pages/Home";
import Service from "@/pages/Service";
import About from "@/pages/About";
import Lifestyle from "@/pages/Lifestyle";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Portal from "@/pages/Portal";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={() => <Service slug="" />} />
        <Route path="/services/:slug" component={Service} />
        <Route path="/about" component={About} />
        <Route path="/lifestyle" component={Lifestyle} />
        <Route path="/resources" component={Resources} />
        <Route path="/contact" component={Contact} />
        <Route path="/portal" component={Portal} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
